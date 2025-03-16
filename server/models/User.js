// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  stats: {
    correctAnswers: {
      type: Number,
      default: 0,
      min: [0, "Correct answers cannot be negative"]
    },
    incorrectAnswers: {
      type: Number,
      default: 0,
      min: [0, "Incorrect answers cannot be negative"]
    },
    totalGames: {
      type: Number,
      default: 0,
      min: [0, "Total games cannot be negative"]
    }
  },
  gameHistory: [{
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Destination ID is required"],
      ref: 'Destination'
    },
    isCorrect: {
      type: Boolean,
      required: [true, "Result (isCorrect) is required"]
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});

module.exports = mongoose.model('User', userSchema);
