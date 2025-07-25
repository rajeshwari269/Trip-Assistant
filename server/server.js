const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const { createClient } = require("pexels"); // ✅ Only declared once
const dotenv = require("dotenv");
dotenv.config();


const app = express();

// ✅ CORS and JSON middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve image uploads


const pexelsClient = createClient(process.env.PEXELS_API_KEY);


// Route to get famous or user-searched places from Pexels
app.get("/api/more-places", async (req, res) => {
  try {
    const query = req.query.query?.trim() || "famous places";
    const page = req.query.page
      ? parseInt(req.query.page)
      : Math.floor(Math.random() * 5) + 1; // random page 1-5 if not provided
    const per_page = parseInt(req.query.per_page) || 12;

    const response = await pexelsClient.photos.search({
      query,
      page,
      per_page,
    });

    const photos = response.photos.map((photo) => ({
      id: photo.id,
      src: photo.src.large,
      alt: photo.alt,
      photographer: photo.photographer,
      location: photo.url,
    }));

    res.json(photos);
  } catch (err) {
    console.error("❌ Pexels API error:", err.message);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});



// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "richa@2006",
  database: "tripPlannerDB",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Database connected!");
  }
});

// Storage setup for multer
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/**
 * @route   POST /api/properties
 * @desc    Add a new property with images
 */
app.post("/api/properties", upload.array("images", 5), (req, res) => {
  const {
    host_id = 1,
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

  const sql = `
    INSERT INTO properties 
    (host_id, title, description, location, price, max_guests, bedrooms, bathrooms, property_type, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
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
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Property insert failed:", err.message);
      return res.status(500).json({ error: "Failed to add property" });
    }

    const propertyId = result.insertId;
    const imageSql =
      "INSERT INTO property_images (property_id, image_url) VALUES ?";
    const imageValues = imagePaths.map((url) => [propertyId, url]);

    db.query(imageSql, [imageValues], (imgErr) => {
      if (imgErr) {
        console.error("❌ Image insert failed:", imgErr.message);
        return res.status(500).json({ error: "Failed to save images" });
      }

      res.status(201).json({ message: "✅ Property added successfully" });
    });
  });
});

/**
 * @route   GET /api/properties
 * @desc    Get all properties with image URLs
 */
app.get("/api/properties", (req, res) => {
  const sql = `
    SELECT 
      p.*, 
      GROUP_CONCAT(i.image_url) AS images
    FROM properties p
    LEFT JOIN property_images i ON p.property_id = i.property_id
    GROUP BY p.property_id
    ORDER BY p.created_at DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Fetch properties failed:", err.message);
      return res.status(500).json({ error: "Failed to fetch properties" });
    }

    // Split image URLs string into array
    const formatted = results.map((row) => ({
      ...row,
      images: row.images ? row.images.split(",") : [],
    }));

    res.json(formatted);
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
