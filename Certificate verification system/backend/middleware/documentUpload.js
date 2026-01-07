const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads/documents');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: certificateId_timestamp.extension
    const certificateId = req.body.certificateId || 'doc';
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${certificateId}_${timestamp}${ext}`);
  }
});

// File filter - accept all file types
const fileFilter = (req, file, cb) => {
  // Accept all file types - only check file size in multer config
  cb(null, true);
};

// Configure multer
const documentUpload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: fileFilter
});

module.exports = documentUpload;
