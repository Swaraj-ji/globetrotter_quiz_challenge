// controllers/destinationController.js
const Destination = require('../models/Destination');

exports.getRandomDestination = async (req, res, next) => {
  try {
    const count = await Destination.countDocuments();
    if (count === 0) {
      return res.status(404).json({ success: false, message: 'No destinations available' });
    }

    const randomIndex = Math.floor(Math.random() * count);
    const destination = await Destination.findOne().skip(randomIndex);

    // Get additional options, excluding the chosen destination.
    const otherOptions = await Destination.aggregate([
      { $match: { _id: { $ne: destination._id } } },
      { $sample: { size: 3 } },
    ]);

    // Shuffle the options for display.
    const options = [destination, ...otherOptions].sort(() => Math.random() - 0.5);

    return res.status(200).json({ success: true, destination, options });
  } catch (error) {
    next(error);
  }
};
