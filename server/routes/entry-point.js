// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Signup
router.post("/signup", async (req, res) => {
  const { userName, email, password, mobileNo } = req.body;


  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const newUser = new User({
      user_name: userName,
      email,
      password,
      mobile_no: mobileNo,
    });

    await newUser.save();
    console.log("user signed up successfully. User id is",newUser._id, newUser)
    res.status(201).json({ message: "Signup successful", user_id: newUser._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to register user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;



  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "User not registered. Please sign up" });
    }
    console.log("user logged in sucessfully.user id is ,",user._id, user)
    res.status(200).json({
      message: "Login successful",
      user_id: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
