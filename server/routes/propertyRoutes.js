const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

// POST /api/properties - Add new property
router.post("/", upload.array("images", 5), addProperty);

// GET /api/properties - Get all properties
router.get("/", getAllProperties);

// GET /api/properties/:id - Get property by ID
router.get("/:id", getPropertyById);

// PUT /api/properties/:id - Update property
router.put("/:id", updateProperty);

// DELETE /api/properties/:id - Delete property
router.delete("/:id", deleteProperty);

module.exports = router;
