const Certificate = require('../models/Certificate');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Search certificate by ID
exports.searchCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    if (!certificateId) {
      return res.status(400).json({
        success: false,
        message: 'Certificate ID is required'
      });
    }

    const certificate = await Certificate.findOne({
      where: { certificateId: certificateId.toUpperCase() }
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    if (certificate.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: `This certificate has been ${certificate.status}`
      });
    }

    res.json({
      success: true,
      data: { certificate }
    });
  } catch (error) {
    console.error('Search certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching certificate',
      error: error.message
    });
  }
};

// Verify certificate
exports.verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({
      where: { certificateId: certificateId.toUpperCase() }
    });

    if (!certificate) {
      return res.json({
        success: true,
        verified: false,
        message: 'Certificate not found in our records'
      });
    }

    res.json({
      success: true,
      verified: certificate.status === 'active',
      data: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        internshipDomain: certificate.internshipDomain,
        startDate: certificate.startDate,
        endDate: certificate.endDate,
        duration: certificate.duration,
        status: certificate.status,
        issuedDate: certificate.issuedDate
      }
    });
  } catch (error) {
    console.error('Verify certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying certificate',
      error: error.message
    });
  }
};

// Generate and download certificate PDF
exports.downloadCertificate = async (req, res) => {
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

    if (certificate.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This certificate is not active and cannot be downloaded'
      });
    }

    // Create PDF
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate-${certificate.certificateId}.pdf`);

    // Pipe the PDF to the response
    doc.pipe(res);

    // Certificate Design
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Border
    doc.lineWidth(10);
    doc.rect(20, 20, pageWidth - 40, pageHeight - 40).stroke('#1a5490');
    
    doc.lineWidth(3);
    doc.rect(30, 30, pageWidth - 60, pageHeight - 60).stroke('#4a90e2');

    // Header
    doc.fontSize(40)
       .font('Helvetica-Bold')
       .fillColor('#1a5490')
       .text('CERTIFICATE', 0, 80, { align: 'center' });

    doc.fontSize(18)
       .font('Helvetica')
       .fillColor('#666')
       .text('OF INTERNSHIP COMPLETION', 0, 135, { align: 'center' });

    // Decorative line
    doc.moveTo(pageWidth / 2 - 150, 170)
       .lineTo(pageWidth / 2 + 150, 170)
       .lineWidth(2)
       .stroke('#4a90e2');

    // Main content
    doc.fontSize(16)
       .font('Helvetica')
       .fillColor('#333')
       .text('This is to certify that', 0, 200, { align: 'center' });

    doc.fontSize(32)
       .font('Helvetica-Bold')
       .fillColor('#1a5490')
       .text(certificate.studentName, 0, 240, { align: 'center' });

    doc.fontSize(16)
       .font('Helvetica')
       .fillColor('#333')
       .text('has successfully completed the internship in', 0, 290, { align: 'center' });

    doc.fontSize(24)
       .font('Helvetica-Bold')
       .fillColor('#4a90e2')
       .text(certificate.internshipDomain, 0, 325, { align: 'center' });

    // Duration and dates
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    doc.fontSize(14)
       .font('Helvetica')
       .fillColor('#555')
       .text(`Duration: ${certificate.duration}`, 0, 380, { align: 'center' });

    doc.fontSize(14)
       .text(`From ${formatDate(certificate.startDate)} to ${formatDate(certificate.endDate)}`, 0, 405, { align: 'center' });

    // Certificate ID
    doc.fontSize(12)
       .fillColor('#999')
       .text(`Certificate ID: ${certificate.certificateId}`, 0, 450, { align: 'center' });

    // Issue date
    doc.fontSize(12)
       .text(`Issue Date: ${formatDate(certificate.issuedDate)}`, 0, 470, { align: 'center' });

    // Signature area
    const signatureY = pageHeight - 120;
    
    doc.fontSize(12)
       .fillColor('#333')
       .text('_____________________', 150, signatureY, { width: 200, align: 'center' });
    
    doc.fontSize(10)
       .fillColor('#666')
       .text('Authorized Signature', 150, signatureY + 25, { width: 200, align: 'center' });

    doc.fontSize(12)
       .fillColor('#333')
       .text('_____________________', pageWidth - 350, signatureY, { width: 200, align: 'center' });
    
    doc.fontSize(10)
       .fillColor('#666')
       .text('Date', pageWidth - 350, signatureY + 25, { width: 200, align: 'center' });

    // Footer
    doc.fontSize(10)
       .fillColor('#999')
       .text('This is a computer-generated certificate and does not require a physical signature', 0, pageHeight - 40, { 
         align: 'center' 
       });

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error('Download certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating certificate',
      error: error.message
    });
  }
};

// Get certificate statistics
exports.getCertificateStats = async (req, res) => {
  try {
    const total = await Certificate.count();
    const active = await Certificate.count({ where: { status: 'active' } });
    const revoked = await Certificate.count({ where: { status: 'revoked' } });
    const expired = await Certificate.count({ where: { status: 'expired' } });

    res.json({
      success: true,
      data: {
        total,
        active,
        revoked,
        expired
      }
    });
  } catch (error) {
    console.error('Get certificate stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};
