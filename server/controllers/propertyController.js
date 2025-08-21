const Property = require("../models/property");
const { handleServerError, sendSuccess } = require("../utils/errorHandler");

// Add new property
const addProperty = async (req, res) => {
  try {
    const {
      host_id,
      title,
      description,
      location,
      price,
      max_guests,
      bedrooms,
      bathrooms,
      property_type,
      status,
    } = req.body;

    const imagePaths = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

    const property = await Property.create({
      host_id: host_id || req.user?.userId || "1",
      title,
      description,
      location,
      price,
      max_guests,
      bedrooms,
      bathrooms,
      property_type,
      status,
      images: imagePaths,
    });

    return sendSuccess(res, { property }, "Property added successfully");
  } catch (error) {
    return handleServerError(error, "Add property error", res);
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).sort({ createdAt: -1 });
    return sendSuccess(res, { properties });
  } catch (error) {
    return handleServerError(error, "Get properties error", res);
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    return sendSuccess(res, { property });
  } catch (error) {
    return handleServerError(error, "Get property error", res);
  }
};

// Update property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return sendSuccess(res, { property });
  } catch (error) {
    return handleServerError(error, "Update property error", res);
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return sendSuccess(res, { message: "Property deleted successfully" });
  } catch (error) {
    return handleServerError(error, "Delete property error", res);
  }
};

// Export all controllers
module.exports = {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};

// For backward compatibility with existing routes
exports.addProperty = addProperty;
exports.getProperties = getAllProperties;
