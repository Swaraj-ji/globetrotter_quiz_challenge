// controllers/challengeController.js
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const Challenge = require('../models/Challenge');

exports.createChallenge = async (req, res, next) => {
  try {
    let { username, score } = req.body;
    if (!username || !username.trim()) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }
    username = username.trim().toLowerCase();

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Determine score details – use provided score or compute from user stats.
    let scoreData = {};
    if (score) {
      scoreData = {
        correctAnswers: score.correct,
        incorrectAnswers: score.incorrect,
        totalAnswers: score.total,
        successRate: score.successRate,
      };
    } else {
      const total = user.stats.correctAnswers + user.stats.incorrectAnswers;
      scoreData = {
        correctAnswers: user.stats.correctAnswers,
        incorrectAnswers: user.stats.incorrectAnswers,
        totalAnswers: total,
        successRate: total > 0 ? Math.round((user.stats.correctAnswers / total) * 100) : 0,
      };
    }

    const newChallenge = new Challenge({
      creatorId: user._id,
      creatorName: user.username,
      inviteCode: uuidv4().substring(0, 8),
      creatorScore: scoreData.successRate,
      correctAnswers: scoreData.correctAnswers,
      incorrectAnswers: scoreData.incorrectAnswers,
      destinationsGuessed: scoreData.totalAnswers,
    });

    await newChallenge.save();

    return res.status(201).json({ success: true, inviteCode: newChallenge.inviteCode });
  } catch (error) {
    next(error);
  }
};

exports.getChallengeByInviteCode = async (req, res, next) => {
  try {
    const { inviteCode } = req.params;
    const challenge = await Challenge.findOne({ inviteCode });
    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }
    return res.status(200).json({
      success: true,
      challenge: {
        creatorName: challenge.creatorName,
        creatorScore: challenge.creatorScore,
        correctAnswers: challenge.correctAnswers,
        incorrectAnswers: challenge.incorrectAnswers,
        destinationsGuessed: challenge.destinationsGuessed,
        createdAt: challenge.createdAt,
        acceptedBy: challenge.acceptedBy,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.acceptChallenge = async (req, res, next) => {
  try {
    const { inviteCode } = req.params;
    let { username } = req.body;
    if (!username || !username.trim()) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }
    username = username.trim().toLowerCase();

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const total = user.stats.correctAnswers + user.stats.incorrectAnswers;
    const scorePercentage = total > 0 ? Math.round((user.stats.correctAnswers / total) * 100) : 0;

    const updatedChallenge = await Challenge.findOneAndUpdate(
      { inviteCode },
      {
        $push: {
          acceptedBy: {
            userId: user._id,
            username: user.username,
            score: scorePercentage,
          },
        },
      },
      { new: true }
    );

    if (!updatedChallenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    return res.status(200).json({
      success: true,
      challenge: {
        creatorName: updatedChallenge.creatorName,
        creatorScore: updatedChallenge.creatorScore,
        acceptedBy: updatedChallenge.acceptedBy,
      },
    });
  } catch (error) {
    next(error);
  }
};
