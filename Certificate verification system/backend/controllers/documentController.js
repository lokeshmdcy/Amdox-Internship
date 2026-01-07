const Certificate = require('../models/Certificate');
const path = require('path');
const fs = require('fs');

// Upload document for a certificate
exports.uploadDocument = async (req, res) => {
  try {
    const { certificateId } = req.body;

    if (!certificateId) {
      // Delete uploaded file if exists
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Certificate ID is required'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Find certificate
    const certificate = await Certificate.findOne({ 
      where: { certificateId: certificateId.toUpperCase() }
    });

    if (!certificate) {
      // Delete uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Delete old document if exists
    if (certificate.documentPath) {
      const oldPath = path.join(__dirname, '../uploads/documents', path.basename(certificate.documentPath));
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Update certificate with document path
    const documentPath = `/uploads/documents/${req.file.filename}`;
    await certificate.update({ documentPath });

    res.json({
      success: true,
      message: 'Document uploaded successfully',
      data: {
        certificateId: certificate.certificateId,
        documentPath: certificate.documentPath,
        fileName: req.file.filename,
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      }
    });
  } catch (error) {
    // Delete uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Upload document error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading document',
      error: error.message
    });
  }
};

// Get document for a certificate
exports.getDocument = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ 
      where: { certificateId: certificateId.toUpperCase() }
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    if (!certificate.documentPath) {
      return res.status(404).json({
        success: false,
        message: 'No document found for this certificate'
      });
    }

    const filePath = path.join(__dirname, '../uploads/documents', path.basename(certificate.documentPath));

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Document file not found on server'
      });
    }

    // Send file
    res.sendFile(filePath);
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving document',
      error: error.message
    });
  }
};

// Delete document for a certificate
exports.deleteDocument = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ 
      where: { certificateId: certificateId.toUpperCase() }
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    if (!certificate.documentPath) {
      return res.status(404).json({
        success: false,
        message: 'No document found for this certificate'
      });
    }

    // Delete file from server
    const filePath = path.join(__dirname, '../uploads/documents', path.basename(certificate.documentPath));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Update certificate
    await certificate.update({ documentPath: null });

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting document',
      error: error.message
    });
  }
};
