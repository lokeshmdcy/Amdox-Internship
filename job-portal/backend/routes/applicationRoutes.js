const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getReceivedApplications,
  updateApplicationStatus,
  getApplication
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('jobseeker'), applyForJob);
router.get('/my-applications', protect, authorize('jobseeker'), getMyApplications);
router.get('/received', protect, authorize('employer'), getReceivedApplications);
router.put('/:id/status', protect, authorize('employer'), updateApplicationStatus);
router.get('/:id', protect, getApplication);

module.exports = router;
