// controllers/leaderboardController.js
const User = require('../models/User');

exports.getLeaderboard = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Compute a success rate for each user and prepare the leaderboard data
    const leaderboard = users.map(user => {
      const { correctAnswers, incorrectAnswers, totalGames } = user.stats;
      // Calculate success rate if games have been played, otherwise 0
      const successRate = totalGames > 0 ? Math.round((correctAnswers / totalGames) * 100) : 0;
      return {
        username: user.username,
        correctAnswers,
        incorrectAnswers,
        totalGames,
        successRate,
        createdAt: user.createdAt
      };
    });

    // Sort users in descending order by success rate, then by number of correct answers
    leaderboard.sort((a, b) => b.successRate - a.successRate || b.correctAnswers - a.correctAnswers);

    res.status(200).json({ success: true, leaderboard });
  } catch (error) {
    next(error);
  }
};
