const express = require('express');
const { validateRegistration } = require('../middleware/validation');
const authenticateToken = require('../middleware/auth');
const authController = require('../controllers/authController');

const router = express.Router();

// Debugging middleware to log route and method
router.use((req, res, next) => {
  console.log(`Route: ${req.path}, Method: ${req.method}`);
  next();
});

// Register
router.post('/register', validateRegistration, authController.register);

// ...other auth routes and controller methods as needed...

// Login
router.post('/login', authController.login);

// Verify JWT
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    // The authenticateToken middleware has already verified the token and set req.user
    if (!req.user || !req.user.role) {
      return res.status(401).json({ success: false, message: 'Invalid token or user not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Token is valid', 
      data: { 
        user: {
          ...req.user,
          isAdmin: req.user.role === 'admin'
        }
      } 
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

module.exports = router;
