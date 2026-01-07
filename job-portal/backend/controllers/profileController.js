const { User } = require('../models');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resumes/');
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Only PDF and Word documents are allowed!');
    }
  }
}).single('resume');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      phone: req.body.phone
    };

    // Job seeker specific fields
    if (req.user.role === 'jobseeker') {
      if (req.body.skills) fieldsToUpdate.skills = req.body.skills;
      if (req.body.education) fieldsToUpdate.education = req.body.education;
      if (req.body.experience) fieldsToUpdate.experience = req.body.experience;
    }

    // Employer specific fields
    if (req.user.role === 'employer') {
      if (req.body.companyName) fieldsToUpdate.companyName = req.body.companyName;
      if (req.body.companyDescription) fieldsToUpdate.companyDescription = req.body.companyDescription;
      if (req.body.companyWebsite) fieldsToUpdate.companyWebsite = req.body.companyWebsite;
    }

    const user = await User.findByPk(req.user.id);
    await user.update(fieldsToUpdate);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload resume
// @route   POST /api/profile/resume
// @access  Private (Job Seeker only)
exports.uploadResume = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    try {
      const user = await User.findByPk(req.user.id);
      await user.update({ resume: req.file.path });

      res.status(200).json({
        success: true,
        data: user,
        filePath: req.file.path
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });
};
