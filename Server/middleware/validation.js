const validator = require('validator');

const validateRegistration = (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;
  console.log('Validating registration data:', { firstName, lastName, email, phone, passwordLength: password ? password.length : 0 });
  
  const errors = [];
  if (!firstName || firstName.trim().length === 0) errors.push('First name is required');
  if (!lastName || lastName.trim().length === 0) errors.push('Last name is required');
  if (!email || !validator.isEmail(email)) errors.push('Valid email is required');
  if (!phone || phone.trim().length === 0) errors.push('Phone number is required');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters long');
  
  if (errors.length > 0) {
    console.log('Validation errors:', errors);
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }
  next();
};

module.exports = { validateRegistration };
