// User Routes for the Node.js Express API
// Handles user-related routes only (no business logic)

const express = require('express');
const router = express.Router();

// Import the controller function for user registration
const { registerUser, loginUser } = require('../controllers/userController');
// @route   POST /register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// Export the router for use in app.js
module.exports = router;