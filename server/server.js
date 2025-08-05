const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { createClient } = require("pexels");

const dotenv = require("dotenv");
dotenv.config();

// Database connection
const db = require("./config/db");
const { handleServerError, logError, sendSuccess } = require("./utils/errorHandler");
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

// Import routes
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

const pexelsClient = createClient(process.env.PEXELS_API_KEY);

// Test route to verify server is working
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Trip Assistant API is running",
    endpoints: {
      auth: {
        login: "POST /login",
        signup: "POST /signup"
      },
      properties: "GET /api/properties"
    }
  });
});

// Use routes
app.use('/', userRoutes); // This will handle /login and /signup routes
app.use('/api/properties', propertyRoutes);

const { successResponse, errorResponse } = require("./utils/responseUtils");

// Route to get famous or user-searched places from Pexels
app.get("/api/more-places", async (req, res) => {
  try {
    const { query = "famous places", page = 1, per_page = 12 } = req.query;

    // Enhanced mock data with unique images and better variety
    const allMockData = [
      {
        id: 1,
        src: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
        alt: "Red Fort - Historic Mughal Architecture in Delhi",
        photographer: "Delhi Photographer",
        location: "https://maps.google.com/?q=Red+Fort+Delhi",
        city: "Delhi",
        attraction: "Red Fort",
        description:
          "Historic capital with Mughal architecture - Visit the magnificent Red Fort",
        price: "₹2,500",
        rating: "4.8",
      },
      {
        id: 2,
        src: "https://images.pexels.com/photos/2014423/pexels-photo-2014423.jpeg",
        alt: "Gateway of India - Iconic Monument in Mumbai",
        photographer: "Mumbai Photographer",
        location: "https://maps.google.com/?q=Gateway+of+India+Mumbai",
        city: "Mumbai",
        attraction: "Gateway of India",
        description:
          "City of dreams with beaches and Bollywood - Visit the iconic Gateway of India",
        price: "₹3,200",
        rating: "4.6",
      },
      {
        id: 3,
        src: "https://images.pexels.com/photos/2014424/pexels-photo-2014424.jpeg",
        alt: "Victoria Memorial - Colonial Heritage in Kolkata",
        photographer: "Kolkata Photographer",
        location: "https://maps.google.com/?q=Victoria+Memorial+Kolkata",
        city: "Kolkata",
        attraction: "Victoria Memorial",
        description:
          "Cultural capital with colonial heritage - Visit the grand Victoria Memorial",
        price: "₹1,800",
        rating: "4.7",
      },
      {
        id: 4,
        src: "https://images.pexels.com/photos/2014425/pexels-photo-2014425.jpeg",
        alt: "Marina Beach - Beautiful Beach in Chennai",
        photographer: "Chennai Photographer",
        location: "https://maps.google.com/?q=Marina+Beach+Chennai",
        city: "Chennai",
        attraction: "Marina Beach",
        description:
          "Gateway to South India with beautiful beaches - Visit the stunning Marina Beach",
        price: "₹2,100",
        rating: "4.5",
      },
      {
        id: 5,
        src: "https://images.pexels.com/photos/2014426/pexels-photo-2014426.jpeg",
        alt: "Lalbagh Botanical Garden - Garden City in Bangalore",
        photographer: "Bangalore Photographer",
        location:
          "https://maps.google.com/?q=Lalbagh+Botanical+Garden+Bangalore",
        city: "Bangalore",
        attraction: "Lalbagh Botanical Garden",
        description:
          "Garden city and IT hub of India - Visit the beautiful Lalbagh Botanical Garden",
        price: "₹2,800",
        rating: "4.9",
      },
      {
        id: 6,
        src: "https://images.pexels.com/photos/2014427/pexels-photo-2014427.jpeg",
        alt: "Charminar - Iconic Monument in Hyderabad",
        photographer: "Hyderabad Photographer",
        location: "https://maps.google.com/?q=Charminar+Hyderabad",
        city: "Hyderabad",
        attraction: "Charminar",
        description:
          "City of pearls with rich Nizam heritage - Visit the historic Charminar",
        price: "₹2,300",
        rating: "4.4",
      },
      {
        id: 7,
        src: "https://images.pexels.com/photos/2014428/pexels-photo-2014428.jpeg",
        alt: "Shaniwar Wada - Historic Fort in Pune",
        photographer: "Pune Photographer",
        location: "https://maps.google.com/?q=Shaniwar+Wada+Pune",
        city: "Pune",
        attraction: "Shaniwar Wada",
        description:
          "Oxford of the East with educational excellence - Visit the historic Shaniwar Wada",
        price: "₹1,900",
        rating: "4.3",
      },
      {
        id: 8,
        src: "https://images.pexels.com/photos/2014429/pexels-photo-2014429.jpeg",
        alt: "Sabarmati Ashram - Historic Site in Ahmedabad",
        photographer: "Ahmedabad Photographer",
        location: "https://maps.google.com/?q=Sabarmati+Ashram+Ahmedabad",
        city: "Ahmedabad",
        attraction: "Sabarmati Ashram",
        description:
          "Manchester of India with rich textile heritage - Visit the historic Sabarmati Ashram",
        price: "₹2,000",
        rating: "4.6",
      },
      {
        id: 9,
        src: "https://images.pexels.com/photos/2014430/pexels-photo-2014430.jpeg",
        alt: "Golden Temple - Sacred Sikh Shrine in Amritsar",
        photographer: "Amritsar Photographer",
        location: "https://maps.google.com/?q=Golden+Temple+Amritsar",
        city: "Amritsar",
        attraction: "Golden Temple",
        description:
          "Spiritual city with the holiest Sikh shrine - Visit the magnificent Golden Temple",
        price: "₹1,500",
        rating: "4.9",
      },
      {
        id: 10,
        src: "https://images.pexels.com/photos/2014431/pexels-photo-2014431.jpeg",
        alt: "Hawa Mahal - Palace of Winds in Jaipur",
        photographer: "Jaipur Photographer",
        location: "https://maps.google.com/?q=Hawa+Mahal+Jaipur",
        city: "Jaipur",
        attraction: "Hawa Mahal",
        description:
          "Pink City with royal heritage - Visit the stunning Hawa Mahal",
        price: "₹2,400",
        rating: "4.7",
      },
      {
        id: 11,
        src: "https://images.pexels.com/photos/2014432/pexels-photo-2014432.jpeg",
        alt: "Taj Mahal - Wonder of the World in Agra",
        photographer: "Agra Photographer",
        location: "https://maps.google.com/?q=Taj+Mahal+Agra",
        city: "Agra",
        attraction: "Taj Mahal",
        description:
          "City of the Taj with Mughal splendor - Visit the iconic Taj Mahal",
        price: "₹3,500",
        rating: "5.0",
      },
      {
        id: 12,
        src: "https://images.pexels.com/photos/2014433/pexels-photo-2014433.jpeg",
        alt: "Varanasi Ghats - Spiritual Capital in Varanasi",
        photographer: "Varanasi Photographer",
        location: "https://maps.google.com/?q=Varanasi+Ghats",
        city: "Varanasi",
        attraction: "Varanasi Ghats",
        description:
          "Spiritual capital on the Ganges - Experience the sacred Varanasi Ghats",
        price: "₹1,800",
        rating: "4.8",
      },
      {
        id: 13,
        src: "https://images.pexels.com/photos/2014434/pexels-photo-2014434.jpeg",
        alt: "Ellora Caves - Ancient Rock-cut Temples in Aurangabad",
        photographer: "Aurangabad Photographer",
        location: "https://maps.google.com/?q=Ellora+Caves+Aurangabad",
        city: "Aurangabad",
        attraction: "Ellora Caves",
        description:
          "Gateway to ancient wonders - Explore the magnificent Ellora Caves",
        price: "₹2,200",
        rating: "4.6",
      },
      {
        id: 14,
        src: "https://images.pexels.com/photos/2014435/pexels-photo-2014435.jpeg",
        alt: "Konark Sun Temple - Architectural Marvel in Puri",
        photographer: "Puri Photographer",
        location: "https://maps.google.com/?q=Konark+Sun+Temple+Puri",
        city: "Puri",
        attraction: "Konark Sun Temple",
        description:
          "Coastal city with spiritual heritage - Visit the stunning Konark Sun Temple",
        price: "₹1,900",
        rating: "4.5",
      },
      {
        id: 15,
        src: "https://images.pexels.com/photos/2014436/pexels-photo-2014436.jpeg",
        alt: "Khajuraho Temples - Ancient Temples in Chhatarpur",
        photographer: "Chhatarpur Photographer",
        location: "https://maps.google.com/?q=Khajuraho+Temples+Chhatarpur",
        city: "Chhatarpur",
        attraction: "Khajuraho Temples",
        description:
          "Ancient temple complex with intricate carvings - Explore the Khajuraho Temples",
        price: "₹2,600",
        rating: "4.7",
      },
      {
        id: 16,
        src: "https://images.pexels.com/photos/2014437/pexels-photo-2014437.jpeg",
        alt: "Ajanta Caves - Buddhist Cave Temples in Aurangabad",
        photographer: "Aurangabad Photographer",
        location: "https://maps.google.com/?q=Ajanta+Caves+Aurangabad",
        city: "Aurangabad",
        attraction: "Ajanta Caves",
        description:
          "Ancient Buddhist cave temples - Discover the beautiful Ajanta Caves",
        price: "₹2,300",
        rating: "4.8",
      },
      // Additional places for Delhi
      {
        id: 17,
        src: "https://images.pexels.com/photos/2014438/pexels-photo-2014438.jpeg",
        alt: "Qutub Minar - Tallest Brick Minaret in Delhi",
        photographer: "Delhi Photographer",
        location: "https://maps.google.com/?q=Qutub+Minar+Delhi",
        city: "Delhi",
        attraction: "Qutub Minar",
        description:
          "Ancient Islamic monument and UNESCO World Heritage Site - Visit the magnificent Qutub Minar",
        price: "₹1,800",
        rating: "4.7",
      },
      {
        id: 18,
        src: "https://images.pexels.com/photos/2014439/pexels-photo-2014439.jpeg",
        alt: "India Gate - War Memorial in Delhi",
        photographer: "Delhi Photographer",
        location: "https://maps.google.com/?q=India+Gate+Delhi",
        city: "Delhi",
        attraction: "India Gate",
        description:
          "Iconic war memorial and national monument - Experience the grandeur of India Gate",
        price: "₹0",
        rating: "4.9",
      },
      // Additional places for Mumbai
      {
        id: 19,
        src: "https://images.pexels.com/photos/2014440/pexels-photo-2014440.jpeg",
        alt: "Marine Drive - Queen's Necklace in Mumbai",
        photographer: "Mumbai Photographer",
        location: "https://maps.google.com/?q=Marine+Drive+Mumbai",
        city: "Mumbai",
        attraction: "Marine Drive",
        description:
          "Famous curved boulevard along the coast - Experience the beautiful Marine Drive",
        price: "₹2,800",
        rating: "4.7",
      },
      {
        id: 20,
        src: "https://images.pexels.com/photos/2014441/pexels-photo-2014441.jpeg",
        alt: "Elephanta Caves - Ancient Cave Temples in Mumbai",
        photographer: "Mumbai Photographer",
        location: "https://maps.google.com/?q=Elephanta+Caves+Mumbai",
        city: "Mumbai",
        attraction: "Elephanta Caves",
        description:
          "Ancient rock-cut cave temples - Explore the historic Elephanta Caves",
        price: "₹1,500",
        rating: "4.5",
      },
      // Additional places for Chennai
      {
        id: 21,
        src: "https://images.pexels.com/photos/2014442/pexels-photo-2014442.jpeg",
        alt: "Kapaleeshwarar Temple - Ancient Temple in Chennai",
        photographer: "Chennai Photographer",
        location: "https://maps.google.com/?q=Kapaleeshwarar+Temple+Chennai",
        city: "Chennai",
        attraction: "Kapaleeshwarar Temple",
        description:
          "Ancient Dravidian temple architecture - Visit the sacred Kapaleeshwarar Temple",
        price: "₹0",
        rating: "4.6",
      },
      {
        id: 22,
        src: "https://images.pexels.com/photos/2014443/pexels-photo-2014443.jpeg",
        alt: "Fort St. George - Historic Fort in Chennai",
        photographer: "Chennai Photographer",
        location: "https://maps.google.com/?q=Fort+St+George+Chennai",
        city: "Chennai",
        attraction: "Fort St. George",
        description:
          "First British fortress in India - Explore the historic Fort St. George",
        price: "₹1,200",
        rating: "4.4",
      },
      // Additional places for Bangalore
      {
        id: 23,
        src: "https://images.pexels.com/photos/2014444/pexels-photo-2014444.jpeg",
        alt: "Cubbon Park - Urban Park in Bangalore",
        photographer: "Bangalore Photographer",
        location: "https://maps.google.com/?q=Cubbon+Park+Bangalore",
        city: "Bangalore",
        attraction: "Cubbon Park",
        description:
          "Historic park in the heart of the city - Relax in the beautiful Cubbon Park",
        price: "₹0",
        rating: "4.8",
      },
      {
        id: 24,
        src: "https://images.pexels.com/photos/2014445/pexels-photo-2014445.jpeg",
        alt: "Bangalore Palace - Royal Palace in Bangalore",
        photographer: "Bangalore Photographer",
        location: "https://maps.google.com/?q=Bangalore+Palace",
        city: "Bangalore",
        attraction: "Bangalore Palace",
        description:
          "Royal palace with Tudor architecture - Visit the magnificent Bangalore Palace",
        price: "₹2,500",
        rating: "4.6",
      },
      // Additional places for Kolkata
      {
        id: 25,
        src: "https://images.pexels.com/photos/2014446/pexels-photo-2014446.jpeg",
        alt: "Howrah Bridge - Iconic Bridge in Kolkata",
        photographer: "Kolkata Photographer",
        location: "https://maps.google.com/?q=Howrah+Bridge+Kolkata",
        city: "Kolkata",
        attraction: "Howrah Bridge",
        description:
          "Iconic cantilever bridge over the Hooghly River - Experience the majestic Howrah Bridge",
        price: "₹0",
        rating: "4.8",
      },
      {
        id: 26,
        src: "https://images.pexels.com/photos/2014447/pexels-photo-2014447.jpeg",
        alt: "Dakshineswar Kali Temple - Sacred Temple in Kolkata",
        photographer: "Kolkata Photographer",
        location: "https://maps.google.com/?q=Dakshineswar+Kali+Temple+Kolkata",
        city: "Kolkata",
        attraction: "Dakshineswar Kali Temple",
        description:
          "Famous Hindu temple dedicated to Goddess Kali - Visit the sacred Dakshineswar Temple",
        price: "₹0",
        rating: "4.7",
      },
      // Additional places for Hyderabad
      {
        id: 27,
        src: "https://images.pexels.com/photos/2014448/pexels-photo-2014448.jpeg",
        alt: "Golconda Fort - Historic Fort in Hyderabad",
        photographer: "Hyderabad Photographer",
        location: "https://maps.google.com/?q=Golconda+Fort+Hyderabad",
        city: "Hyderabad",
        attraction: "Golconda Fort",
        description:
          "Ancient fortress and former diamond trading center - Explore the historic Golconda Fort",
        price: "₹2,000",
        rating: "4.6",
      },
      {
        id: 28,
        src: "https://images.pexels.com/photos/2014449/pexels-photo-2014449.jpeg",
        alt: "Hussain Sagar - Artificial Lake in Hyderabad",
        photographer: "Hyderabad Photographer",
        location: "https://maps.google.com/?q=Hussain+Sagar+Hyderabad",
        city: "Hyderabad",
        attraction: "Hussain Sagar",
        description:
          "Heart-shaped lake with Buddha statue - Visit the beautiful Hussain Sagar",
        price: "₹800",
        rating: "4.5",
      },
      // Additional places for Pune
      {
        id: 29,
        src: "https://images.pexels.com/photos/2014450/pexels-photo-2014450.jpeg",
        alt: "Aga Khan Palace - Historic Palace in Pune",
        photographer: "Pune Photographer",
        location: "https://maps.google.com/?q=Aga+Khan+Palace+Pune",
        city: "Pune",
        attraction: "Aga Khan Palace",
        description:
          "Historic palace with Gandhi connection - Visit the beautiful Aga Khan Palace",
        price: "₹1,500",
        rating: "4.4",
      },
      {
        id: 30,
        src: "https://images.pexels.com/photos/2014451/pexels-photo-2014451.jpeg",
        alt: "Sinhagad Fort - Hill Fort in Pune",
        photographer: "Pune Photographer",
        location: "https://maps.google.com/?q=Sinhagad+Fort+Pune",
        city: "Pune",
        attraction: "Sinhagad Fort",
        description:
          "Ancient hill fort with panoramic views - Explore the historic Sinhagad Fort",
        price: "₹1,200",
        rating: "4.6",
      },
      // Additional places for Ahmedabad
      {
        id: 31,
        src: "https://images.pexels.com/photos/2014452/pexels-photo-2014452.jpeg",
        alt: "Sidi Saiyyed Mosque - Historic Mosque in Ahmedabad",
        photographer: "Ahmedabad Photographer",
        location: "https://maps.google.com/?q=Sidi+Saiyyed+Mosque+Ahmedabad",
        city: "Ahmedabad",
        attraction: "Sidi Saiyyed Mosque",
        description:
          "Famous for its stone lattice work - Visit the beautiful Sidi Saiyyed Mosque",
        price: "₹0",
        rating: "4.5",
      },
      {
        id: 32,
        src: "https://images.pexels.com/photos/2014453/pexels-photo-2014453.jpeg",
        alt: "Kankaria Lake - Artificial Lake in Ahmedabad",
        photographer: "Ahmedabad Photographer",
        location: "https://maps.google.com/?q=Kankaria+Lake+Ahmedabad",
        city: "Ahmedabad",
        attraction: "Kankaria Lake",
        description:
          "Largest lake in the city with entertainment zone - Visit the scenic Kankaria Lake",
        price: "₹500",
        rating: "4.3",
      },
    ];

    // Filter data based on search query
    let filteredData = allMockData;
    if (query && query.toLowerCase() !== "famous places") {
      const searchTerm = query.toLowerCase();

      // Extract city name from search query (e.g., "famous places in delhi" -> "delhi")
      const cityMatch = searchTerm.match(/in\s+([a-zA-Z]+)/);
      const cityName = cityMatch ? cityMatch[1].toLowerCase() : searchTerm;

      // Also check for direct city names
      const directCityMatch = searchTerm.match(
        /(delhi|mumbai|kolkata|chennai|bangalore|hyderabad|pune|ahmedabad|amritsar|jaipur|agra|varanasi|aurangabad|puri|chhatarpur)/i
      );
      const directCity = directCityMatch
        ? directCityMatch[1].toLowerCase()
        : null;

      filteredData = allMockData.filter((place) => {
        const placeCity = place.city.toLowerCase();
        const placeAttraction = place.attraction.toLowerCase();
        const placeDescription = place.description.toLowerCase();
        const placeAlt = place.alt.toLowerCase();

        // More flexible matching
        const searchTerms = [cityName, directCity].filter(Boolean);

        return searchTerms.some(
          (term) =>
            placeCity.includes(term) ||
            placeAttraction.includes(term) ||
            placeDescription.includes(term) ||
            placeAlt.includes(term)
        );
      });

      console.log(
        `🔍 Search terms: ${[cityName, directCity].filter(Boolean).join(", ")}`
      );
      console.log(
        `🏙️ All cities in data:`,
        allMockData.map((p) => p.city)
      );
      console.log(
        `🎯 Filtered cities:`,
        filteredData.map((p) => p.city)
      );

      // If no results found, return all data
      if (filteredData.length === 0) {
        console.log(`No results found for "${query}", returning all places`);
        filteredData = allMockData;
      }
    }

    // Calculate pagination
    const startIndex = (parseInt(page) - 1) * parseInt(per_page);
    const endIndex = startIndex + parseInt(per_page);
    const pageData = filteredData.slice(startIndex, endIndex);

    // Generate unique IDs for pagination to avoid React key conflicts
    const finalData = pageData.map((place, index) => ({
      ...place,
      id: startIndex + index + 1, // Ensure unique IDs across pages
    }));

    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `✅ API Response: Query="${query}", Found ${finalData.length} places, Page ${page}`
      );
      console.log(`🔍 Filtered data length: ${filteredData.length}`);
      console.log(
        `🏙️ Cities in filtered data:`,
        filteredData.map((p) => p.city)
      );
    }
    
    return res.json(successResponse(
      finalData,
      `Successfully retrieved ${finalData.length} places`,
      200
    ));
  } catch (err) {
    console.error("Failed to fetch places:", err);
    return res.status(500).json(errorResponse(
      "Failed to fetch places. Please try again later.",
      500,
      "PLACES_FETCH_ERROR"
    ));
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
      return handleServerError(err, "Property insert", res, 500);
    }

    const propertyId = result.insertId;
    const imageSql =
      "INSERT INTO property_images (property_id, image_url) VALUES ?";
    const imageValues = imagePaths.map((url) => [propertyId, url]);

    db.query(imageSql, [imageValues], (imgErr) => {
      if (imgErr) {
        return handleServerError(imgErr, "Image insert", res, 500);
      }

      return sendSuccess(res, { propertyId: propertyId }, "Property added successfully", 201);
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
      return handleServerError(err, "Fetch properties", res, 500);
    }

    // Split image URLs string into array
    const formatted = results.map((row) => ({
      ...row,
      images: row.images ? row.images.split(",") : [],
    }));

    return sendSuccess(res, formatted, "Properties fetched successfully");
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`💻 Environment: ${process.env.NODE_ENV || 'development'}`);
});
