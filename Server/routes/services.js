
const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/adminAuth');
const authenticateToken = require('../middleware/auth');
const serviceController = require('../controllers/serviceController');

// Get all active services (public route for booking form)
router.get('/', serviceController.getActiveServices);

// Get all services (admin only)
router.get('/admin', authenticateToken, verifyAdmin, serviceController.getAllServices);

// Add new service (admin only)
router.post('/', authenticateToken, verifyAdmin, serviceController.addService);

// Update service (admin only)
router.put('/:id', authenticateToken, verifyAdmin, serviceController.updateService);


// Delete service (admin only, hard delete)
router.delete('/:id', authenticateToken, verifyAdmin, serviceController.deleteService);

module.exports = router;
