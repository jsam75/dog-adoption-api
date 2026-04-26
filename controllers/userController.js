const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
const registerUser = async (req, res) => {
  try {
    // Accept name, email, password from the request body
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Check if user already exists in the database 
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    // Hash the user's password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user instance with the hashed password
    const user = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword
    });  

     // Save the new user to the database
     await user.save();

     // Return a success response
     res.status(201).json({
       message: 'User registered successfully.',
       user: {
         id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
         createdAt: user.createdAt
       }
     });
   } catch (err) {
     console.error(err);
     // Handle unexpected server errors
     res.status(500).json({
       error: 'Server error'
     });
   }
 };

 // User Login
    const loginUser = async (req, res) => {
      try {
        // Accept email and password from the request body
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required.' });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find user by email using Mongoose (normalize email)
        const user = await User.findOne({ email: normalizedEmail }).select('+password');

        if (!user) {
          // If user not found, return 401 
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          // If password does not match, return 401 
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If valid, generate a JWT token using jsonwebtoken      
        const token = jwt.sign(
          { 
            id: user._id, 
            email: user.email, 
            role: user.role 
          },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );

        // Return token in JSON response
       return res.status(200).json({ token });

      } catch (err) {
        console.error(err);
        // Handle unexpected server errors
       return res.status(500).json({ error: 'Server error' });
      }
    };
   
   
module.exports = {
  registerUser,
  loginUser
};
