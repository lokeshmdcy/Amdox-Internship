const { Application, Job, User } = require('../models');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Job Seeker only)
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    // Check if job exists
    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This job is no longer accepting applications'
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      where: {
        jobId,
        jobSeekerId: req.user.id
      }
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    // Create application
    const application = await Application.create({
      jobId,
      jobSeekerId: req.user.id,
      employerId: job.employerId,
      coverLetter
    });

    res.status(201).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all applications for a job seeker
// @route   GET /api/applications/my-applications
// @access  Private (Job Seeker only)
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { jobSeekerId: req.user.id },
      include: [
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'companyName', 'location', 'jobType', 'salaryMin', 'salaryMax', 'salaryCurrency', 'status']
        },
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'name', 'email', 'companyName']
        }
      ],
      order: [['appliedAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all applications for employer's jobs
// @route   GET /api/applications/received
// @access  Private (Employer only)
exports.getReceivedApplications = async (req, res) => {
  try {
    const { jobId, status } = req.query;
    
    let where = { employerId: req.user.id };

    if (jobId) {
      where.jobId = jobId;
    }

    if (status) {
      where.status = status;
    }

    const applications = await Application.findAll({
      where,
      include: [
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'location', 'jobType']
        },
        {
          model: User,
          as: 'jobSeeker',
          attributes: ['id', 'name', 'email', 'phone', 'resume', 'skills', 'education', 'experience']
        }
      ],
      order: [['appliedAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Employer only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Make sure user is the employer for this application
    if (application.employerId !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this application'
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single application details
// @route   GET /api/applications/:id
// @access  Private
exports.getApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [
        {
          model: Job,
          as: 'job'
        },
        {
          model: User,
          as: 'jobSeeker',
          attributes: ['id', 'name', 'email', 'phone', 'resume', 'skills', 'education', 'experience']
        },
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'name', 'email', 'companyName']
        }
      ]
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Make sure user is either the job seeker or employer
    if (
      application.jobSeekerId !== req.user.id &&
      application.employerId !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view this application'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
