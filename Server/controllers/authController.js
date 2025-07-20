// Auth Controller
// Handles business logic for authentication and registration

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

/**
 * Generate JWT token
 */
const generateToken = (userId, isAdmin) => {
  return jwt.sign({
    userId,
    role: isAdmin ? 'admin' : 'user'
  }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Register user or admin
 */
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, address, role } = req.body;
    if (role === 'admin') {
      const existingAdmin = await Admin.findByEmail(email);
      if (existingAdmin) {
        return res.status(400).json({ success: false, message: 'Admin with this email already exists' });
      }
      const admin = new Admin({ firstName, lastName, email, phone, password, role: 'admin' });
      await admin.save();
      const token = generateToken(admin._id, true);
      return res.status(201).json({ success: true, message: 'Admin registered successfully', data: { user: admin.getPublicProfile(), token } });
    } else {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }
      const user = new User({ firstName, lastName, email, phone, password, address: address || {} });
      await user.save();
      const token = generateToken(user._id, false);
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
};


/**
 * Login user or admin
 */
exports.login = async (req, res) => {
  try {
    console.log('Login endpoint hit');
    console.log('Login request body:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      console.error('Missing email or password');
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    console.log('Looking for admin account...');
    let account = await Admin.findByEmail(email).select('+password');
    if (!account) {
      console.log('Admin not found, looking for user account...');
      account = await User.findByEmail(email).select('+password');
    }
    if (!account) {
      console.error('No account found for email:', email);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    if (!account.isActive) {
      console.error('Account is deactivated:', email);
      return res.status(401).json({ success: false, message: 'Account is deactivated. Please contact support.' });
    }
    console.log('Comparing password...');
    const isPasswordValid = await account.comparePassword(password);
    if (!isPasswordValid) {
      console.error('Invalid password for account:', email);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const isAdmin = account.role === 'admin';
    const token = generateToken(account._id, isAdmin);
    console.log('Login successful for:', email);
    res.json({ success: true, message: 'Login successful', data: { user: account.getPublicProfile(), token } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed', error: error.message, stack: error.stack });
  }
};
