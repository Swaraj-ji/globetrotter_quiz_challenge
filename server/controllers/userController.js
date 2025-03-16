// controllers/userController.js
const User = require('../models/User');

exports.registerUser = async (req, res, next) => {
  try {
    let { username } = req.body;
    if (!username || !username.trim()) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }
    username = username.trim().toLowerCase();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    const newUser = new User({ username });
    await newUser.save();

    return res.status(201).json({
      success: true,
      user: { username: newUser.username, stats: newUser.stats },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    let { username } = req.params;
    if (!username || !username.trim()) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }
    username = username.trim().toLowerCase();

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      user: { username: user.username, stats: user.stats, createdAt: user.createdAt },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUserScore = async (req, res, next) => {
  try {
    let { username } = req.params;
    if (!username || !username.trim()) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }
    username = username.trim().toLowerCase();

    const { isCorrect, destinationId } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { username },
      {
        $inc: {
          'stats.correctAnswers': isCorrect ? 1 : 0,
          'stats.incorrectAnswers': isCorrect ? 0 : 1,
          'stats.totalGames': 1,
        },
        $push: { gameHistory: { destinationId, isCorrect } },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      user: { username: updatedUser.username, stats: updatedUser.stats },
    });
  } catch (error) {
    next(error);
  }
};
