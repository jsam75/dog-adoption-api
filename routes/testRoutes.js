// Simple test route to check if the server and database connection are working
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// .get function to test DB connection by listing collections
router.get('/test-db', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ success: true, collections });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export the router for app.js to use
module.exports = router;