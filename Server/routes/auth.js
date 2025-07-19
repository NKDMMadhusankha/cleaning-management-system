const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { validateRegistration } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Debugging middleware to log route and method
router.use((req, res, next) => {
  console.log(`Route: ${req.path}, Method: ${req.method}`);
  next();
});

// Register
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, address, role } = req.body;
    if (role === 'admin') {
      const existingAdmin = await Admin.findByEmail(email);
      if (existingAdmin) {
        return res.status(400).json({ success: false, message: 'Admin with this email already exists' });
      }
      const admin = new Admin({ firstName, lastName, email, phone, password, role: 'admin' });
      await admin.save();
      console.log('Admin registered:', admin.email);
      const token = generateToken(admin._id);
      return res.status(201).json({ success: true, message: 'Admin registered successfully', data: { user: admin.getPublicProfile(), token } });
    } else {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }
      const user = new User({ firstName, lastName, email, phone, password, address: address || {} });
      await user.save();
      console.log('User registered:', user.email);
      const token = generateToken(user._id);
      return res.status(201).json({ success: true, message: 'User registered successfully', data: { user: user.getPublicProfile(), token } });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: 'Validation error', errors });
    }
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Try to find user in Admin first, then User
    let account = await Admin.findByEmail(email).select('+password');
    if (!account) {
      account = await User.findByEmail(email).select('+password');
    }
    if (!account) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    if (!account.isActive) {
      return res.status(401).json({ success: false, message: 'Account is deactivated. Please contact support.' });
    }
    const isPasswordValid = await account.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const token = generateToken(account._id);
    res.json({ success: true, message: 'Login successful', data: { user: account.getPublicProfile(), token } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
});

// Verify JWT
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Invalid token or user not found' });
    }
    res.json({ success: true, message: 'Token is valid', data: { user: user.getPublicProfile() } });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

module.exports = router;
