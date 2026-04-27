// Import mongoose to define the schema and model for User
const mongoose = require('mongoose');

// Define what User looks like in DB
const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: true,
      trim: true
    },
    // User's email address (unique, always stored in lowercase and trimmed of whitespace)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    // User's account password (hashed elsewhere, required)
    password: {
      type: String,
      required: true
    },
    // Role of the user, defaults to 'user' (can be 'user', 'admin', etc.)
    role: {
      type: String,
      default: 'user'
    }
  },
  {
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

// Take schema and make it usable
const User = mongoose.model('User', userSchema);

// Export the User model for use in controllers
module.exports = User;