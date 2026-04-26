const express = require('express');
const router = express.Router();

// Import controller functions for dog routes to use
const { getDogs, createDog, adoptDog, deleteDog, getMyDogs, getAdoptedDogs } = require('../controllers/dogController');

// Import middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Define Routes - order matters! 1. Static routes, 2. General, 3. Dynamic routes with :id, 
// 4. Catch-all routes (optional) - if used, helps avoid route conflicts and ensures correct route matching

// Static routes first
router.get('/my-dogs', authMiddleware, getMyDogs);
router.get('/adopted', authMiddleware, getAdoptedDogs);

// General collection routes
router.post('/', authMiddleware, createDog);
router.get('/', getDogs);

// Dynamic routes next (non-:id last)
router.patch('/:id/adopt', authMiddleware, adoptDog);
router.delete('/:id', authMiddleware, deleteDog);

// Export the router for app.js to use
module.exports = router;