const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

// Public routes - no authentication required
router.get('/search/:certificateId', certificateController.searchCertificate);
router.get('/verify/:certificateId', certificateController.verifyCertificate);
router.get('/download/:certificateId', certificateController.downloadCertificate);
router.get('/stats', certificateController.getCertificateStats);

module.exports = router;
