// routes/challengeRoutes.js
const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');

router.post('/create', challengeController.createChallenge);
router.get('/:inviteCode', challengeController.getChallengeByInviteCode);
router.post('/:inviteCode/accept', challengeController.acceptChallenge);

module.exports = router;
