// Import mongoose to define the schema and model for Dog
const mongoose = require('mongoose');

// Define what Dog looks like in DB
const DogSchema = new mongoose.Schema(
  {
    // Name of the dog (required)
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Breed of the dog (required)
    breed: {
      type: String,
      required: true,
      trim: true,
    },
    // Age of the dog (optional)
    age: {
      type: Number,
    },
    // Adoption status (defaults to false)
    adopted: {
      type: Boolean,
      default: false,
    },
    // Owner
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
},
  {
    // Enable timestamps (createdAt, updatedAt)
    timestamps: true,
  }
);

// Take schema and make it usable
const Dog = mongoose.model('Dog', DogSchema);

// Export the Dog model for use in controllers
module.exports = Dog;