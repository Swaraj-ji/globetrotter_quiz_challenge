// routes/destinationRoutes.js
const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

router.get('/random', destinationController.getRandomDestination);

module.exports = router;
