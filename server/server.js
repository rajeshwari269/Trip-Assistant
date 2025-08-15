const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Database connection
const db = require("./config/db");
const { handleServerError, logError, sendSuccess } = require("./utils/errorHandler");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

// DB Connection check-point
mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const entryRoutes = require("./routes/entry-point");
const propertyRoutes = require("./routes/properties");
const userActivityRoutes=require("./routes/user-activity-check")

//routing apis 
app.use("/entry-point", entryRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/user/activity",userActivityRoutes)

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
