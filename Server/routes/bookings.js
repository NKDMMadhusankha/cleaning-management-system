const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authenticateToken = require('../middleware/auth');
const { verifyAdmin } = require('../middleware/adminAuth');

// Delete booking (for booking owner)
// Move this route definition below to just before the admin delete route

// Update booking details (for booking owner)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    // Only allow owner to update
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this booking' });
    }
    const { customer_name, address, date_time, service_type } = req.body;
    if (!customer_name || !address || !date_time || !service_type) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    booking.customer_name = customer_name;
    booking.address = address;
    booking.date_time = date_time;
    booking.service_type = service_type;
    await booking.save();
    res.json({ success: true, message: 'Booking updated successfully', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating booking', error: error.message });
  }
});

// Get bookings for the current user
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

// Validate booking data
const validateBooking = (req, res, next) => {
  const { customer_name, address, date_time, service_type } = req.body;
  const errors = [];

  if (!customer_name || customer_name.trim().length === 0) {
    errors.push('Customer name is required');
  }
  if (!address || address.trim().length === 0) {
    errors.push('Address is required');
  }
  if (!date_time) {
    errors.push('Date and time are required');
  }
  if (!service_type) {
    errors.push('Service type is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Create a new booking
router.post('/', authenticateToken, validateBooking, async (req, res) => {
  try {
    const { customer_name, address, date_time, service_type } = req.body;
    
    // Create new booking
    const booking = new Booking({
      customer_name,
      address,
      date_time,
      service_type,
      user: req.user && req.user.userId ? req.user.userId : null // Always use userId for consistency
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
});

// Get all bookings (protected route - only for admin)
router.get('/', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ created_at: -1 })
      .populate('user', 'firstName lastName email');

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// Get user's bookings
router.get('/my-bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ created_at: -1 });

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching your bookings',
      error: error.message
    });
  }
});

// Delete booking (protected route - only for admin)
// Delete booking (for booking owner)
router.delete('/user/:id', authenticateToken, async (req, res) => {
  try {
    console.log('Delete booking request:', req.params.id, 'User:', req.user.userId);
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      console.log('Booking not found:', req.params.id);
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    console.log('Booking found:', booking);
    // Only allow owner to delete
    if (booking.user.toString() !== req.user.userId) {
      console.log('Not authorized. Booking user:', booking.user.toString(), 'Request user:', req.user.userId);
      return res.status(403).json({ success: false, message: 'Not authorized to delete this booking' });
    }
    await booking.deleteOne();
    console.log('Booking deleted:', req.params.id);
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.log('Error deleting booking:', error);
    res.status(500).json({ success: false, message: 'Error deleting booking', error: error.message });
  }
});
router.delete('/:id', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting booking',
      error: error.message
    });
  }
});

// Update booking status (protected route - only for admin)
router.put('/:id/status', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message
    });
  }
});

module.exports = router;