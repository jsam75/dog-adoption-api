// routes/test.js (or inside app.js temporarily)
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/test-db', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ success: true, collections });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;