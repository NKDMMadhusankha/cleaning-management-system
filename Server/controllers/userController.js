// User Controller
// Handles business logic for user-related operations

const User = require('../models/User');
const Admin = require('../models/Admin');

/**
 * Get current user profile
 */
exports.getProfile = async (req, res) => {
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
};

/**
 * Update current user profile
 */
exports.updateProfile = async (req, res) => {
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
};
