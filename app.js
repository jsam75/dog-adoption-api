// Load environment variables from .env file
require('dotenv').config();

// Imports:

  // Import necessary libraries and modules for the Express app
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

  // Import route files to use in the app
const dogsRoutes = require('./routes/dogs');

const testRoutes = require('./routes/testRoutes');

const userRoutes = require('./routes/userRoutes');

// App setup
const app = express();

app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use('/dogs', dogsRoutes);

app.use('/', testRoutes);

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Dog Adoption Platform API!');
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

