const { Job, User } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all jobs with filters
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const { keyword, location, jobType, minSalary, maxSalary } = req.query;
    
    // Build query
    let where = { status: 'active' };

    // Keyword search (searches in title, description, qualifications)
    if (keyword) {
      where[Op.or] = [
        { title: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } },
        { qualifications: { [Op.like]: `%${keyword}%` } }
      ];
    }

    // Location filter
    if (location) {
      where.location = { [Op.like]: `%${location}%` };
    }

    // Job type filter
    if (jobType) {
      where.jobType = jobType;
    }

    // Salary range filter
    if (minSalary) {
      where.salaryMin = { [Op.gte]: Number(minSalary) };
    }
    if (maxSalary) {
      where.salaryMax = { [Op.lte]: Number(maxSalary) };
    }

    const jobs = await Job.findAll({
      where,
      include: [{
        model: User,
        as: 'employer',
        attributes: ['id', 'name', 'email', 'companyName']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'employer',
        attributes: ['id', 'name', 'email', 'companyName', 'companyDescription', 'companyWebsite', 'phone']
      }]
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer only)
exports.createJob = async (req, res) => {
  try {
    // Add employer to req.body
    const jobData = {
      ...req.body,
      employerId: req.user.id,
      companyName: req.user.companyName,
      salaryMin: req.body.salaryRange.min,
      salaryMax: req.body.salaryRange.max,
      salaryCurrency: req.body.salaryRange.currency || 'USD'
    };

    const job = await Job.create(jobData);

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Employer only)
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Make sure user is job owner
    if (job.employerId !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }

    job = await job.update(req.body);

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Make sure user is job owner
    if (job.employerId !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }

    await job.destroy();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get jobs posted by logged in employer
// @route   GET /api/jobs/employer/me
// @access  Private (Employer only)
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({ 
      where: { employerId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
