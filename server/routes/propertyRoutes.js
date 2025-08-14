const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  addProperty,
  getProperties,
} = require("../controllers/propertyController");

// POST /api/properties
router.post("/", upload.array("images", 5), addProperty);

// GET /api/properties
router.get("/", getProperties);

module.exports = router;
