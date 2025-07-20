const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// GET /api/users/me - get current user profile
const Admin = require('../models/Admin');
router.get('/me', auth, async (req, res) => {
  try {
    let account = await User.findById(req.user.userId).select('-password');
    if (!account) {
      account = await Admin.findById(req.user.userId).select('-password');
    }
    if (!account) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: account });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/users/me - update current user profile
router.put('/me', auth, async (req, res) => {
  try {
    const updateFields = {};
    ['firstName', 'lastName', 'email', 'phone'].forEach(field => {
      if (req.body[field] !== undefined) updateFields[field] = req.body[field];
    });
    let account = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updateFields },
      { new: true, select: '-password' }
    );
    if (!account) {
      account = await Admin.findByIdAndUpdate(
        req.user.userId,
        { $set: updateFields },
        { new: true, select: '-password' }
      );
    }
    if (!account) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: account });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
