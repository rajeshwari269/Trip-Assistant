// routes/properties.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Property = require("../models/property");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // safer and reliable
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Add new property
router.post("/add", upload.array("images", 5), async (req, res) => {
    console.log("backend /add api called")
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

  const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

  try {
    const newProperty = new Property({
      host_id: host_id || null,
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
console.log(newProperty)
    await newProperty.save();
    
    res.status(201).json({ message: "Property added successfully" });
  } catch (err) {
    console.error("SAVE ERROR:", err); // <--- important
  res.status(500).json({ error: "Failed to add property", details: err.message });
  }
});

// Fetch all properties
router.get("/read", async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

module.exports = router;
