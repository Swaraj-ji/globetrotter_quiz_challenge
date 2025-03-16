// server.js
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

// Connect to the database
connectDB();

// Middleware for JSON parsing
app.use(express.json());
app.use(cors())

// Mount routes
app.use('/challenges', require('./routes/challengeRoutes'));
app.use('/destinations', require('./routes/destinationRoutes'));
app.use('/game', require('./routes/gameRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/leaderboard', require('./routes/leaderboardRoutes')); 

// Global error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
