const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const jokeRoutes = require('./routes/jokeRoutes');

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', jokeRoutes); // Prefix API routes with /api

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});