// controllers/gameController.js
const User = require('../models/User');

exports.checkAnswer = async (req, res, next) => {
  try {
    const { destinationId, answer, username } = req.body;

    // Implement your answer-checking logic. Here we assume a simple comparison.
    const isCorrect = destinationId === answer._id;
    console.log(isCorrect)
    console.log(destinationId)
    console.log(answer)

    if (username && username.trim()) {
      const normalizedUsername = username.trim().toLowerCase();
      await User.findOneAndUpdate(
        { username: normalizedUsername },
        {
          $inc: {
            'stats.correctAnswers': isCorrect ? 1 : 0,
            'stats.incorrectAnswers': isCorrect ? 0 : 1,
            'stats.totalGames': 1,
          },
          $push: { gameHistory: { destinationId, isCorrect } },
        }
      );
    }

    return res.status(200).json({ success: true, isCorrect });
  } catch (error) {
    next(error);
  }
};
