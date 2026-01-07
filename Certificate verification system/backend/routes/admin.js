const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const documentUpload = require('../middleware/documentUpload');
const adminController = require('../controllers/adminController');
const documentController = require('../controllers/documentController');

// All admin routes require authentication and admin privileges
router.use(auth, isAdmin);

// Certificate routes
router.post('/certificates/upload', upload.single('file'), adminController.uploadCertificates);
router.get('/certificates', adminController.getAllCertificates);
router.put('/certificates/:id', adminController.updateCertificate);
router.delete('/certificates/:id', adminController.deleteCertificate);
router.get('/dashboard/stats', adminController.getDashboardStats);

// Document routes
router.post('/documents/upload', documentUpload.single('document'), documentController.uploadDocument);
router.get('/documents/:certificateId', documentController.getDocument);
router.delete('/documents/:certificateId', documentController.deleteDocument);

module.exports = router;
