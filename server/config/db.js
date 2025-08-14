//this db.js is used in controller can be changes if needed, another db is alreay in server.js file
// Updated database configuration for Trip Assistant
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "tripPlannerDB",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    console.error("Please check your MySQL credentials and make sure the database exists.");
    // Don't exit the process, allow the server to start even if DB connection fails
  } else {
    console.log("✅ MySQL Database connected successfully!");
  }
});

module.exports = db;
