/**
 * Delete service (admin only, hard delete)
 */
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting service', error: error.message });
  }
};
// Service Controller
// Handles business logic for service-related operations

const Service = require('../models/Service');

/**
 * Get all active services (public route)
 */
exports.getActiveServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching services', error: error.message });
  }
};

/**
 * Get all services (admin only)
 */
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching services', error: error.message });
  }
};

/**
 * Add new service (admin only)
 */
exports.addService = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Service name is required' });
    }
    const existingService = await Service.findOne({ name: name.trim() });
    if (existingService) {
      return res.status(400).json({ success: false, message: 'Service already exists' });
    }
    const service = new Service({
      name: name.trim(),
      description: description?.trim() || ''
    });
    await service.save();
    res.status(201).json({ success: true, message: 'Service added successfully', data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding service', error: error.message });
  }
};

/**
 * Update service (admin only)
 */
exports.updateService = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Service name is required' });
    }
    // ...existing code for update logic...
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating service', error: error.message });
  }
};
