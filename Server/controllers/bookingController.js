/**
 * Create a new booking
 */
exports.createBooking = async (req, res) => {
  try {
    const { customer_name, address, date_time, service_type } = req.body;
    if (!customer_name || !address || !date_time || !service_type) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const booking = new Booking({
      customer_name,
      address,
      date_time,
      service_type,
      user: req.user ? req.user.userId : undefined
    });
    await booking.save();
    res.status(201).json({ success: true, message: 'Booking created successfully', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating booking', error: error.message });
  }
};
// Booking Controller
// Handles business logic for booking-related operations

const Booking = require('../models/Booking');

/**
 * Update booking details (for booking owner)
 */
exports.updateBooking = async (req, res) => {
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
};

/**
 * Get bookings for the current user
 */
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

// ...other booking controller methods to be added as needed...
