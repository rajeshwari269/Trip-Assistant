const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { handleServerError, sendSuccess } = require('../utils/errorHandler');

// Login controller
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required'
    });
  }

  // In production, we would hash passwords. For now, using plain text for test user
  const query = 'SELECT * FROM users WHERE email = ?';
  
  db.query(query, [email], async (err, results) => {
    if (err) {
      return handleServerError(err, 'Database login query', res);
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = results[0];

    // For now, direct password comparison for the test user
    // In production, use: const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-default-secret-key',
      { expiresIn: '1d' }
    );

    // Remove password from response
    delete user.password;

    return sendSuccess(res, { user, token }, 'Login successful');
  });
};

// Register controller
const register = (req, res) => {
  const { userName, email, password, mobileNo } = req.body;

  if (!userName || !email || !password || !mobileNo) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  // Check if email already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return handleServerError(err, 'Registration email check', res);
    }

    if (results.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // In production, hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // For now, using plain text
    const hashedPassword = password;

    // Insert new user
    const insertQuery = 'INSERT INTO users (userName, email, password, mobileNo) VALUES (?, ?, ?, ?)';
    
    db.query(insertQuery, [userName, email, hashedPassword, mobileNo], (err, results) => {
      if (err) {
        return handleServerError(err, 'User creation', res);
      }

      return sendSuccess(res, { id: results.insertId }, 'User registered successfully');
    });
  });
};

module.exports = {
  login,
  register
};
