const Certificate = require('../models/Certificate');
const User = require('../models/User');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const { Op, col, fn, literal } = require('sequelize');
const sequelize = require('../config/database');

// Upload bulk certificates from Excel
exports.uploadCertificates = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const filePath = req.file.path;
    
    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    if (data.length === 0) {
      // Delete uploaded file
      fs.unlinkSync(filePath);
      return res.status(400).json({
        success: false,
        message: 'Excel file is empty'
      });
    }

    const results = {
      success: [],
      failed: [],
      duplicates: []
    };

    // Process each row
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      
      try {
        // Validate required fields
        if (!row.certificateId || !row.studentName || !row.internshipDomain || 
            !row.startDate || !row.endDate) {
          results.failed.push({
            row: i + 2, // Excel row number (accounting for header)
            data: row,
            reason: 'Missing required fields'
          });
          continue;
        }

        // Check for duplicates
        const existing = await Certificate.findOne({ 
          where: { certificateId: String(row.certificateId).toUpperCase() }
        });
        
        if (existing) {
          results.duplicates.push({
            row: i + 2,
            certificateId: row.certificateId,
            reason: 'Certificate ID already exists'
          });
          continue;
        }

        // Parse dates
        let startDate, endDate;
        
        if (typeof row.startDate === 'number') {
          startDate = XLSX.SSF.parse_date_code(row.startDate);
          startDate = new Date(startDate.y, startDate.m - 1, startDate.d);
        } else {
          startDate = new Date(row.startDate);
        }
        
        if (typeof row.endDate === 'number') {
          endDate = XLSX.SSF.parse_date_code(row.endDate);
          endDate = new Date(endDate.y, endDate.m - 1, endDate.d);
        } else {
          endDate = new Date(row.endDate);
        }

        // Validate dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          results.failed.push({
            row: i + 2,
            data: row,
            reason: 'Invalid date format'
          });
          continue;
        }

        if (endDate < startDate) {
          results.failed.push({
            row: i + 2,
            data: row,
            reason: 'End date cannot be before start date'
          });
          continue;
        }

        // Create certificate
        const certificate = await Certificate.create({
          certificateId: String(row.certificateId).toUpperCase(),
          studentName: row.studentName,
          internshipDomain: row.internshipDomain,
          startDate: startDate,
          endDate: endDate,
          grade: row.grade || 'Pass',
          uploadedBy: req.user.id
        });
        
        results.success.push({
          row: i + 2,
          certificateId: certificate.certificateId,
          studentName: certificate.studentName
        });
      } catch (error) {
        results.failed.push({
          row: i + 2,
          data: row,
          reason: error.message
        });
      }
    }

    // Delete uploaded file after processing
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: 'Bulk upload completed',
      data: {
        totalRecords: data.length,
        successCount: results.success.length,
        failedCount: results.failed.length,
        duplicateCount: results.duplicates.length,
        results: results
      }
    });
  } catch (error) {
    console.error('Upload certificates error:', error);
    
    // Clean up file if exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'Error uploading certificates',
      error: error.message
    });
  }
};

// Get all certificates (admin only)
exports.getAllCertificates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {};
    
    // Filter by status if provided
    if (req.query.status) {
      where.status = req.query.status;
    }

    // Search by student name or certificate ID
    if (req.query.search) {
      where[Op.or] = [
        { studentName: { [Op.like]: `%${req.query.search}%` } },
        { certificateId: { [Op.like]: `%${req.query.search}%` } }
      ];
    }

    const { count, rows } = await Certificate.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        as: 'uploader',
        attributes: ['name', 'email']
      }]
    });

    res.json({
      success: true,
      data: {
        certificates: rows,
        pagination: {
          total: count,
          page,
          pages: Math.ceil(count / limit),
          limit
        }
      }
    });
  } catch (error) {
    console.error('Get all certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching certificates',
      error: error.message
    });
  }
};

// Delete certificate
exports.deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findByPk(id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    await certificate.destroy();

    res.json({
      success: true,
      message: 'Certificate deleted successfully'
    });
  } catch (error) {
    console.error('Delete certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting certificate',
      error: error.message
    });
  }
};

// Update certificate
exports.updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent updating certificateId
    delete updates.certificateId;
    delete updates.uploadedBy;

    const certificate = await Certificate.findByPk(id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    await certificate.update(updates);

    res.json({
      success: true,
      message: 'Certificate updated successfully',
      data: { certificate }
    });
  } catch (error) {
    console.error('Update certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating certificate',
      error: error.message
    });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalCertificates = await Certificate.count();
    const activeCertificates = await Certificate.count({ where: { status: 'active' } });
    const totalUsers = await User.count({ where: { role: 'user' } });
    
    // Get recent uploads
    const recentCertificates = await Certificate.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
      attributes: ['certificateId', 'studentName', 'internshipDomain', 'createdAt']
    });

    // Group by domain using raw query
    const domainStats = await Certificate.findAll({
      where: { status: 'active' },
      attributes: [
        'internshipDomain',
        [fn('COUNT', col('id')), 'count']
      ],
      group: ['internshipDomain'],
      order: [[literal('count'), 'DESC']],
      limit: 5,
      raw: true
    });

    // Format domain stats
    const formattedDomainStats = domainStats.map(item => ({
      _id: item.internshipDomain,
      count: parseInt(item.count)
    }));

    res.json({
      success: true,
      data: {
        totalCertificates,
        activeCertificates,
        totalUsers,
        recentCertificates,
        domainStats: formattedDomainStats
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};
