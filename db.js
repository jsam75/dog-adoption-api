// Import mongoose to connect to MongoDB
const mongoose = require('mongoose');

// Function to connect to MongoDB using the connection string from environment variables
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Fail Fast - Immediately exit the process with failure code if the connection fails
    process.exit(1); // where 1 = generic failure code, 0 = success
  }
};

// Export the connectDB function for use in app.js
module.exports = connectDB;