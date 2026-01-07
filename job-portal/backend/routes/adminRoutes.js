const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const adminController = require('../controllers/adminController');

// All routes require admin authentication
router.use(adminAuth);

// Dashboard stats
router.get('/dashboard/stats', adminController.getDashboardStats);

// Analytics
router.get('/analytics', adminController.getAnalytics);

// User management
router.get('/users', adminController.getAllUsers);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Job management
router.get('/jobs', adminController.getAllJobs);
router.delete('/jobs/:id', adminController.deleteJob);
router.patch('/jobs/:id/status', adminController.updateJobStatus);

// Application management
router.get('/applications', adminController.getAllApplications);
router.patch('/applications/:id/status', adminController.updateApplicationStatus);

module.exports = router;
