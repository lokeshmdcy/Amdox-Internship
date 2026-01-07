const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const { Op } = require('sequelize');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalJobs = await Job.count();
    const totalApplications = await Application.count();
    const activeJobs = await Job.count({ where: { status: 'active' } });
    
    const jobSeekers = await User.count({ where: { role: 'jobseeker' } });
    const employers = await User.count({ where: { role: 'employer' } });
    
    const recentUsers = await User.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'email', 'role', 'createdAt']
    });

    const recentJobs = await Job.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['name', 'email']
      }]
    });

    const recentApplications = await Application.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name', 'email']
        },
        {
          model: Job,
          attributes: ['title', 'companyName']
        }
      ]
    });

    res.json({
      stats: {
        totalUsers,
        totalJobs,
        totalApplications,
        activeJobs,
        jobSeekers,
        employers
      },
      recentUsers,
      recentJobs,
      recentApplications
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

// Get all users with pagination
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const role = req.query.role;
    const search = req.query.search;

    let whereClause = {};
    if (role) {
      whereClause.role = role;
    }
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password'] }
    });

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalUsers: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Get all jobs with pagination
exports.getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    let whereClause = {};
    if (status) {
      whereClause.status = status;
    }
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { companyName: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows: jobs } = await Job.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['name', 'email']
      }]
    });

    res.json({
      jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalJobs: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

// Get all applications with pagination
exports.getAllApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status;

    let whereClause = {};
    if (status) {
      whereClause.status = status;
    }

    const { count, rows: applications } = await Application.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'phone']
        },
        {
          model: Job,
          attributes: ['title', 'companyName', 'location']
        }
      ]
    });

    res.json({
      applications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalApplications: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin users' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, phone } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.phone = phone || user.phone;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByPk(id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.destroy();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
};

// Update job status
exports.updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.status = status;
    await job.save();

    res.json({ message: 'Job status updated successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job status', error: error.message });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();

    res.json({ message: 'Application status updated successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error: error.message });
  }
};

// Get analytics data
exports.getAnalytics = async (req, res) => {
  try {
    // Jobs by type
    const jobsByType = await Job.findAll({
      attributes: [
        'jobType',
        [Job.sequelize.fn('COUNT', Job.sequelize.col('id')), 'count']
      ],
      group: ['jobType']
    });

    // Applications by status
    const applicationsByStatus = await Application.findAll({
      attributes: [
        'status',
        [Application.sequelize.fn('COUNT', Application.sequelize.col('id')), 'count']
      ],
      group: ['status']
    });

    // Users growth (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const userGrowth = await User.findAll({
      attributes: [
        [User.sequelize.fn('DATE_FORMAT', User.sequelize.col('createdAt'), '%Y-%m'), 'month'],
        [User.sequelize.fn('COUNT', User.sequelize.col('id')), 'count']
      ],
      where: {
        createdAt: { [Op.gte]: sixMonthsAgo }
      },
      group: [User.sequelize.fn('DATE_FORMAT', User.sequelize.col('createdAt'), '%Y-%m')],
      order: [[User.sequelize.fn('DATE_FORMAT', User.sequelize.col('createdAt'), '%Y-%m'), 'ASC']]
    });

    res.json({
      jobsByType,
      applicationsByStatus,
      userGrowth
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
};
