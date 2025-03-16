// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/checkAnswer', gameController.checkAnswer);

module.exports = router;
