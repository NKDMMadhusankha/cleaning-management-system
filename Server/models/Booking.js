const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: [true, 'Customer name is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  date_time: {
    type: Date,
    required: [true, 'Date and time are required']
  },
  service_type: {
    type: String,
    required: [true, 'Service type is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;