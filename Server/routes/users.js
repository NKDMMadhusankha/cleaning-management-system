
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// GET /api/users/me - get current user profile
router.get('/me', auth, userController.getProfile);

// PUT /api/users/me - update current user profile
router.put('/me', auth, userController.updateProfile);

module.exports = router;
