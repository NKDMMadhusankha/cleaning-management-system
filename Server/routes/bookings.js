const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { verifyAdmin } = require('../middleware/adminAuth');
const bookingController = require('../controllers/bookingController');
const Booking = require('../models/Booking');

// Create a new booking
router.post('/', authenticateToken, bookingController.createBooking);

// Get all bookings (admin only)
router.get('/', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ created_at: -1 }).populate('user', 'firstName lastName email phone');
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: error.message });
  }
});

// Delete booking (admin only)
router.delete('/:id', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting booking', error: error.message });
  }
});

// Delete booking (for booking owner)
router.delete('/user/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    // Only allow owner to delete
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this booking' });
    }
    await booking.deleteOne();
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting booking', error: error.message });
  }
});

// Update booking details (for booking owner)
router.put('/:id', authenticateToken, bookingController.updateBooking);

// Get bookings for the current user
router.get('/user', authenticateToken, bookingController.getUserBookings);

// Update booking status (admin only)
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