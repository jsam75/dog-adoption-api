// Import Dog model to interact with the dogs collection in DB
const Dog = require('../models/Dog');

// Get Dog function
const getDogs = async (req, res) => {
  try {
    const { breed, adopted } = req.query;
    const filter = {};

    // Pagination: Read page and limit from req.query, default page=1, limit=5
    const pageNum = parseInt(req.query.page);
    const limitNum = parseInt(req.query.limit);

    const page = pageNum > 0 ? pageNum : 1;
    const limit = limitNum > 0 ? limitNum : 5;

    const skip = (page - 1) * limit;

    if (breed) {
      filter.breed = breed;
    }

    if (adopted !== undefined) {
      // "adopted" is a string ("true" or "false") — convert to boolean
      if (adopted === "true") {
        filter.adopted = true;
      } else if (adopted === "false") {
        filter.adopted = false;
      }
    }
    const total = await Dog.countDocuments(filter);

    // Give pagination info to help navigation
    const dogs = await Dog.find(filter)
    .skip(skip)
    .limit(limit);
      return res.status(200).json({
        total,
        page,
        pages: Math.ceil(total / limit),
        data: dogs
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create Dog function 
const createDog = async (req, res) => {
  try { 
    const dogData = { ...req.body, owner: req.user.id };

    // Validate required fields
    if (!dogData.name || !dogData.breed) {
      return res.status(400).json({ error: 'Name and breed are required.' });
    }

    // Create and save the Dog document - only one creation path to avoid conflict/duplicates
    const createdDog = await Dog.create(dogData);

    // Respond with 201 and the created dog
    return res.status(201).json(createdDog);
} catch (error) {
    return res.status(500).json({ message: error.message });
}
};

// Adopt Dog function
const adoptDog = async (req, res) => {
  try {
    const dogId = req.params.id;

    // Find the dog by ID
    const dog = await Dog.findById(dogId);

    if (!dog) {
      return res.status(404).json({ message: "Dog not found." });
    }

    if (dog.adopted) {
      return res.status(400).json({ message: "Dog is already adopted." });
    }

    dog.adopted = true;
    await dog.save();

    return res.status(200).json(dog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Remove Dog
const deleteDog = async (req, res) => {
  try {
    const dogId = req.params.id;

    // Find the dog by ID
    const dog = await Dog.findById(dogId);

    if (!dog) {
      return res.status(404).json({ message: "Dog not found." });
    }

    // Check if the logged-in user is the owner of the dog
    if (dog.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this dog." });
    }

    // If the dog is adopted, do not allow deletion
    if (dog.adopted) {
      return res.status(400).json({ message: "Cannot delete an adopted dog." });
    }

    await dog.deleteOne();

    return res.status(200).json({ message: "Dog deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// User can get dogs they listed
const getMyDogs = async (req, res) => {
    try {
      const dogs = await Dog.find({ owner: req.user.id });
  
      return res.status(200).json(dogs);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // User can get dogs they adopted
  const getAdoptedDogs = async (req, res) => {
    try {
      const dogs = await Dog.find({ adopted: true });
  
      return res.status(200).json(dogs);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }; 

// Export functions for routes to use
module.exports = {
  getDogs,
  createDog,
  adoptDog,
  deleteDog,
  getMyDogs,
  getAdoptedDogs
};