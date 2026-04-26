const express = require('express');
const router = express.Router();

// Import controller functions
const { getDogs, createDog, adoptDog, deleteDog, getMyDogs, getAdoptedDogs } = require('../controllers/dogController');

// Import middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Define Routes

// Static routes first
router.get('/my-dogs', authMiddleware, getMyDogs);
router.get('/adopted', authMiddleware, getAdoptedDogs);

// General collection routes
router.post('/', authMiddleware, createDog);
router.get('/', getDogs);

// Dynamic routes next (non-:id last)
router.patch('/:id/adopt', authMiddleware, adoptDog);
router.delete('/:id', authMiddleware, deleteDog);


module.exports = router;