// routes/leaderboardRoutes.js
const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

// GET /leaderboard - Returns the sorted leaderboard of users
router.get('/', leaderboardController.getLeaderboard);

module.exports = router;
