// User Routes for the Node.js Express API
// Handles user-related routes only (no business logic)

const express = require('express');
const router = express.Router();

// Import controller functions for user routes to use
const { registerUser, loginUser } = require('../controllers/userController');

// Define the routes for user registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Export the router for use in app.js
module.exports = router;