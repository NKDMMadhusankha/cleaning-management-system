const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { verifyAdmin } = require('../middleware/adminAuth');
const authenticateToken = require('../middleware/auth');

// Get all active services (public route for booking form)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching services', error: error.message });
  }
});

// Get all services (admin only)
router.get('/admin', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching services', error: error.message });
  }
});

// Add new service (admin only)
router.post('/', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ success: false, message: 'Service name is required' });
    }

    // Check if service already exists
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
});

// Update service (admin only)
router.put('/:id', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    
    if (!name) {
      return res.status(400).json({ success: false, message: 'Service name is required' });
    }

    // Check if another service with the same name exists
    const existingService = await Service.findOne({ 
      name: name.trim(), 
      _id: { $ne: req.params.id } 
    });
    if (existingService) {
      return res.status(400).json({ success: false, message: 'Service name already exists' });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        description: description?.trim() || '',
        isActive: isActive !== undefined ? isActive : true
      },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.json({ success: true, message: 'Service updated successfully', data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating service', error: error.message });
  }
});

// Delete service (admin only) - soft delete by setting isActive to false
router.delete('/:id', authenticateToken, verifyAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.json({ success: true, message: 'Service removed successfully', data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error removing service', error: error.message });
  }
});

module.exports = router;
