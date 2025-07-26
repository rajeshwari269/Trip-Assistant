const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

// Database connection
const db = require("./db");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve static images

// Database connection

// Multer storage setup for image uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// API to add a new property with images
app.post("/api/properties", upload.array("images", 5), (req, res) => {
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

  const sql =
    "INSERT INTO properties (host_id, title, description, location, price, max_guests, bedrooms, bathrooms, property_type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    host_id || 1, // Default to host_id 1 for testing
    title,
    description,
    location,
    price,
    max_guests,
    bedrooms,
    bathrooms,
    property_type,
    status,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to add property" });

    const propertyId = result.insertId;
    const imageSql =
      "INSERT INTO property_images (property_id, image_url) VALUES ?";
    const imageValues = imagePaths.map((url) => [propertyId, url]);

    db.query(imageSql, [imageValues], (imgErr) => {
      if (imgErr)
        return res.status(500).json({ error: "Failed to save images" });
      res.status(201).json({ message: "Property added successfully" });
    });
  });
});

// API to fetch properties with images
app.get("/api/properties", (req, res) => {
  const sql = `
    SELECT p.*, GROUP_CONCAT(i.image_url) AS images
    FROM properties p
    LEFT JOIN property_images i ON p.property_id = i.property_id
    GROUP BY p.property_id
    ORDER BY p.created_at DESC`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch properties" });
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
