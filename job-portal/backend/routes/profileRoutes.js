const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadResume
} = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.post('/resume', protect, authorize('jobseeker'), uploadResume);

module.exports = router;
