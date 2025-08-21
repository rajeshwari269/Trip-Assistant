// routes/entry-point.js
const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/userController");

// Use secure authentication controllers
router.post("/signup", register);
router.post("/login", login);

module.exports = router;
