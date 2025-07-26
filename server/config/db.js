//this db.js is used in controller can be changes if needed, another db is alreay in server.js file
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "richa@2006",
  database: "tripPlannerDB",
});

db.connect((err) => {
  if (err) console.error("Database connection failed:", err);
  else console.log("MySQL Database connected!");
});

module.exports = db;
