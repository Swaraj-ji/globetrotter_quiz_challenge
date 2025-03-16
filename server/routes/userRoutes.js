// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.get('/:username', userController.getUserProfile);
router.put('/:username/score', userController.updateUserScore);

module.exports = router;
