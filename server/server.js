const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { createClient } = require("pexels");

const dotenv = require("dotenv");
dotenv.config();

// Database connection
const db = require("./config/db");
const app = express();

// ✅ CORS and JSON middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve image uploads

const pexelsClient = createClient(process.env.PEXELS_API_KEY);

// Test route to verify server is working
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Route to get famous or user-searched places from Pexels
app.get("/api/more-places", async (req, res) => {
  try {
    const { query = "famous places", page = 1, per_page = 12 } = req.query;
    
    // Simple, working mock data with different content for each city
    const mockData = [
      {
        id: 1,
        src: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
        alt: "Red Fort - Historic Mughal Architecture in Delhi",
        photographer: "Delhi Photographer",
        location: "https://maps.google.com/?q=Red+Fort+Delhi",
        city: "Delhi",
        attraction: "Red Fort",
        description: "Historic capital with Mughal architecture - Visit the magnificent Red Fort",
        price: "₹2,500",
        rating: "4.8"
      },
      {
        id: 2,
        src: "https://images.pexels.com/photos/2014423/pexels-photo-2014423.jpeg",
        alt: "Gateway of India - Iconic Monument in Mumbai",
        photographer: "Mumbai Photographer",
        location: "https://maps.google.com/?q=Gateway+of+India+Mumbai",
        city: "Mumbai",
        attraction: "Gateway of India",
        description: "City of dreams with beaches and Bollywood - Visit the iconic Gateway of India",
        price: "₹3,200",
        rating: "4.6"
      },
      {
        id: 3,
        src: "https://images.pexels.com/photos/2014424/pexels-photo-2014424.jpeg",
        alt: "Victoria Memorial - Colonial Heritage in Kolkata",
        photographer: "Kolkata Photographer",
        location: "https://maps.google.com/?q=Victoria+Memorial+Kolkata",
        city: "Kolkata",
        attraction: "Victoria Memorial",
        description: "Cultural capital with colonial heritage - Visit the grand Victoria Memorial",
        price: "₹1,800",
        rating: "4.7"
      },
      {
        id: 4,
        src: "https://images.pexels.com/photos/2014425/pexels-photo-2014425.jpeg",
        alt: "Marina Beach - Beautiful Beach in Chennai",
        photographer: "Chennai Photographer",
        location: "https://maps.google.com/?q=Marina+Beach+Chennai",
        city: "Chennai",
        attraction: "Marina Beach",
        description: "Gateway to South India with beautiful beaches - Visit the stunning Marina Beach",
        price: "₹2,100",
        rating: "4.5"
      },
      {
        id: 5,
        src: "https://images.pexels.com/photos/2014426/pexels-photo-2014426.jpeg",
        alt: "Lalbagh Botanical Garden - Garden City in Bangalore",
        photographer: "Bangalore Photographer",
        location: "https://maps.google.com/?q=Lalbagh+Botanical+Garden+Bangalore",
        city: "Bangalore",
        attraction: "Lalbagh Botanical Garden",
        description: "Garden city and IT hub of India - Visit the beautiful Lalbagh Botanical Garden",
        price: "₹2,800",
        rating: "4.9"
      },
      {
        id: 6,
        src: "https://images.pexels.com/photos/2014427/pexels-photo-2014427.jpeg",
        alt: "Charminar - Iconic Monument in Hyderabad",
        photographer: "Hyderabad Photographer",
        location: "https://maps.google.com/?q=Charminar+Hyderabad",
        city: "Hyderabad",
        attraction: "Charminar",
        description: "City of pearls with rich Nizam heritage - Visit the historic Charminar",
        price: "₹2,300",
        rating: "4.4"
      },
      {
        id: 7,
        src: "https://images.pexels.com/photos/2014428/pexels-photo-2014428.jpeg",
        alt: "Shaniwar Wada - Historic Fort in Pune",
        photographer: "Pune Photographer",
        location: "https://maps.google.com/?q=Shaniwar+Wada+Pune",
        city: "Pune",
        attraction: "Shaniwar Wada",
        description: "Oxford of the East with educational excellence - Visit the historic Shaniwar Wada",
        price: "₹1,900",
        rating: "4.3"
      },
      {
        id: 8,
        src: "https://images.pexels.com/photos/2014429/pexels-photo-2014429.jpeg",
        alt: "Sabarmati Ashram - Historic Site in Ahmedabad",
        photographer: "Ahmedabad Photographer",
        location: "https://maps.google.com/?q=Sabarmati+Ashram+Ahmedabad",
        city: "Ahmedabad",
        attraction: "Sabarmati Ashram",
        description: "Manchester of India with rich textile heritage - Visit the historic Sabarmati Ashram",
        price: "₹2,000",
        rating: "4.6"
      }
    ];

    // Return different data based on page
    const startIndex = (parseInt(page) - 1) * parseInt(per_page);
    const endIndex = startIndex + parseInt(per_page);
    const pageData = mockData.slice(startIndex, endIndex);

    // Add some variety by shuffling and adding more items if needed
    if (pageData.length < parseInt(per_page)) {
      const additionalItems = mockData.slice(0, parseInt(per_page) - pageData.length);
      pageData.push(...additionalItems);
    }

    res.json(pageData);
    
  } catch (err) {
    console.error("❌ Mock API error:", err.message);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

/**
 * @route   GET /api/more-places
 * @desc    Fetches a list of places from Pexels for the "More Places" page.
 * @access  Public
 */
// app.get("/api/more-places", async (req, res) => {
//   const { query, page, per_page } = req.query;

//   if (!process.env.PEXELS_API_KEY) {
//     return res.status(500).json({ error: "Pexels API key is missing." });
//   }
//   if (!query) {
//     return res.status(400).json({ error: "Search query is required." });
//   }

//   try {
//     const response = await pexelsClient.photos.search({
//       query,
//       page: parseInt(page) || 1,
//       per_page: parseInt(per_page) || 12,
//     });

//     res.json(response.photos);
//   } catch (error) {
//     console.error("Error fetching from Pexels for more-places:", error.message);
//     res.status(500).json({ error: "Failed to fetch more places" });
//   }
// });

// Additional middleware (these are already declared above)
// app.use(express.json());
// app.use(cors());
// app.use("/uploads", express.static("uploads")); // Serve uploaded images

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
