# Document Upload Feature

## Overview
The Document Upload feature allows administrators to upload actual certificate documents (PDFs or images) and associate them with specific certificates in the system.

## Features

### Backend
- **Document Upload API** - Upload PDF or image files for certificates
- **File Validation** - Accepts only PDF, JPG, JPEG, and PNG files
- **File Size Limit** - Maximum 5MB per file
- **Storage Management** - Stores files in `uploads/documents/` directory
- **Document Retrieval** - API endpoint to retrieve uploaded documents
- **Document Deletion** - Remove uploaded documents
- **Auto-cleanup** - Replaces old documents when new ones are uploaded

### Frontend
- **Upload Document Page** - Dedicated page for uploading certificate documents
- **Certificate ID Input** - Associate documents with specific certificates
- **File Preview** - Preview images before uploading
- **Upload Progress** - Visual feedback during upload
- **Upload Results** - Detailed success/error messages
- **Document Viewer** - View uploaded documents in admin dashboard

## File Structure

### Backend Files
```
backend/
├── models/
│   └── Certificate.js          # Added documentPath field
├── middleware/
│   └── documentUpload.js       # NEW - Multer configuration for documents
├── controllers/
│   └── documentController.js   # NEW - Document upload/retrieve/delete logic
├── routes/
│   └── admin.js                # Added document routes
├── uploads/
│   └── documents/              # NEW - Storage directory for documents
└── server.js                   # Added static file serving for uploads
```

### Frontend Files
```
frontend/
├── src/
│   ├── pages/
│   │   ├── UploadDocument.js   # NEW - Upload document page
│   │   └── AdminDashboard.js   # Updated - Show document status
│   ├── components/
│   │   └── Navbar.js           # Updated - Added upload link
│   └── App.js                  # Added upload document route
```

## API Endpoints

### 1. Upload Document
**POST** `/api/admin/documents/upload`

**Authentication:** Required (Admin only)

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `document`: File (PDF, JPG, JPEG, PNG)
  - `certificateId`: String (Certificate ID)

**Response:**
```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "certificateId": "CERT001",
    "documentPath": "/uploads/documents/CERT001_1640995200000.pdf",
    "fileName": "CERT001_1640995200000.pdf",
    "fileSize": 524288,
    "mimeType": "application/pdf"
  }
}
```

### 2. Get Document
**GET** `/api/admin/documents/:certificateId`

**Authentication:** Required (Admin only)

**Response:** File download

### 3. Delete Document
**DELETE** `/api/admin/documents/:certificateId`

**Authentication:** Required (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

## Database Schema Update

### Certificate Model
Added new field:
```javascript
documentPath: {
  type: DataTypes.STRING(500),
  allowNull: true,
  comment: 'Path to uploaded certificate document (PDF/Image)'
}
```

## Usage Instructions

### For Administrators

#### Uploading a Document

1. **Login as Admin**
   - Navigate to login page
   - Enter admin credentials

2. **Access Upload Page**
   - Click "Upload Document" in the navigation menu
   - Or navigate to `/admin/upload-document`

3. **Enter Certificate ID**
   - Type the exact Certificate ID (e.g., CERT001)
   - The ID will automatically convert to uppercase

4. **Select File**
   - Click the file upload area
   - Or drag and drop a file
   - Supported formats: PDF, JPG, JPEG, PNG
   - Maximum size: 5MB

5. **Preview (Images only)**
   - Image files will show a preview
   - Verify the correct file is selected

6. **Upload**
   - Click "Upload Document" button
   - Wait for upload confirmation
   - View upload results

#### Viewing Documents

1. **In Admin Dashboard**
   - Go to Admin Dashboard
   - View the certificates table
   - "Document" column shows document status
   - Click "📄 View" to open the document

2. **Direct Access**
   - Documents are accessible via URL:
   - `http://localhost:5000/uploads/documents/filename.pdf`

#### Deleting Documents

- Use the DELETE endpoint
- Or replace by uploading a new document for the same certificate ID

## File Naming Convention

Files are automatically renamed using the pattern:
```
{CERTIFICATE_ID}_{TIMESTAMP}.{EXTENSION}
```

Example: `CERT001_1640995200000.pdf`

This ensures:
- No filename conflicts
- Easy identification
- Automatic versioning

## Validation Rules

### File Type Validation
- **Allowed:** PDF, JPG, JPEG, PNG
- **Rejected:** All other file types

### File Size Validation
- **Maximum:** 5MB (5,242,880 bytes)
- **Minimum:** No minimum (but must be > 0)

### Certificate Validation
- Certificate ID must exist in database
- Certificate must be active (not revoked)

## Error Handling

### Common Errors

1. **"Certificate ID is required"**
   - Solution: Enter a certificate ID

2. **"No file uploaded"**
   - Solution: Select a file before uploading

3. **"Only PDF, JPG, JPEG, and PNG files are allowed"**
   - Solution: Use a supported file format

4. **"File size must be less than 5MB"**
   - Solution: Compress or reduce file size

5. **"Certificate not found"**
   - Solution: Verify the certificate ID exists in the system

6. **"No document found for this certificate"**
   - Solution: Upload a document first

## Security Features

1. **Authentication Required**
   - Only authenticated admins can upload/view/delete documents

2. **File Type Validation**
   - Prevents malicious file uploads
   - Checks both extension and MIME type

3. **File Size Limits**
   - Prevents large file attacks
   - Protects server storage

4. **Automatic Cleanup**
   - Old files are deleted when replaced
   - Prevents storage bloat

5. **Path Sanitization**
   - Prevents directory traversal attacks
   - Uses basename for file access

## Storage Considerations

### Directory Structure
```
backend/
└── uploads/
    └── documents/
        ├── CERT001_1640995200000.pdf
        ├── CERT002_1640995201000.jpg
        └── CERT003_1640995202000.png
```

### Backup Recommendations
- Regular backups of `uploads/` directory
- Store backups separately from application
- Consider cloud storage integration

### Cleanup Strategies
- Implement periodic cleanup of orphaned files
- Remove documents for deleted certificates
- Archive old documents

## Integration with Existing Features

### Certificate Search
- Users can view certificate details
- Future: Add document preview/download for verified certificates

### PDF Generation
- Existing PDF generation still works
- Document upload provides actual scanned certificates
- Both features can coexist

### Excel Upload
- Bulk upload still creates certificates
- Documents must be uploaded separately
- Future: Support bulk document upload

## Future Enhancements

1. **Bulk Document Upload**
   - Upload multiple documents at once
   - Match files to certificates by naming convention

2. **Document Preview**
   - Inline PDF viewer
   - Image gallery view

3. **Version History**
   - Keep multiple versions of documents
   - Track upload history

4. **Cloud Storage**
   - Integration with AWS S3, Google Cloud Storage
   - Better scalability

5. **OCR Integration**
   - Extract text from uploaded documents
   - Auto-fill certificate data

6. **Document Templates**
   - Store certificate templates
   - Generate certificates from templates

7. **Public Access**
   - Allow certificate holders to download their documents
   - QR code for document verification

## Testing

### Manual Testing Checklist

- [ ] Upload PDF document
- [ ] Upload JPG image
- [ ] Upload PNG image
- [ ] Upload JPEG image
- [ ] Try uploading invalid file type
- [ ] Try uploading file > 5MB
- [ ] Upload with missing certificate ID
- [ ] Upload with invalid certificate ID
- [ ] View uploaded document
- [ ] Replace existing document
- [ ] Delete document
- [ ] Check document appears in dashboard
- [ ] Verify auto-cleanup of old files

### API Testing with Postman/cURL

```bash
# Upload document
curl -X POST http://localhost:5000/api/admin/documents/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "document=@certificate.pdf" \
  -F "certificateId=CERT001"

# Get document
curl -X GET http://localhost:5000/api/admin/documents/CERT001 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Delete document
curl -X DELETE http://localhost:5000/api/admin/documents/CERT001 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### Issue: File not uploading

**Check:**
- File size < 5MB
- File type is PDF, JPG, JPEG, or PNG
- Certificate ID exists
- Admin is authenticated

### Issue: "No document found"

**Solution:**
- Upload a document first
- Verify certificate ID is correct
- Check server logs for errors

### Issue: Cannot view document

**Check:**
- File exists in `uploads/documents/`
- Server is serving static files
- Correct URL format
- File permissions

### Issue: Old document not deleted

**Check:**
- `documentPath` is being updated
- File cleanup code is running
- File system permissions

## Maintenance

### Regular Tasks

1. **Monitor Storage**
   - Check disk space usage
   - Clean up orphaned files

2. **Backup Documents**
   - Schedule regular backups
   - Test restore procedures

3. **Update Dependencies**
   - Keep multer up to date
   - Update file validation rules

4. **Security Audits**
   - Review file upload security
   - Check for vulnerabilities

## Support

For issues or questions:
- Check application logs
- Review error messages
- Consult API documentation
- Contact system administrator
