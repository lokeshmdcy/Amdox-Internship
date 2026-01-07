# Certificate Verification System - Backend

Backend API for the Certificate Verification System built with Node.js, Express, and MySQL.

## Features

- 🔐 JWT-based authentication
- 👤 User role management (Admin/User)
- 📊 Excel file upload for bulk certificate data
- 🔍 Certificate search and verification
- 📄 PDF certificate generation
- 🛡️ Security features (Helmet, Rate Limiting, CORS)
- ✅ Input validation

## Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure your `.env` file with:
- MySQL database credentials (host, port, database name, user, password)
- JWT secret
- Port number
- Admin credentials

4. Create admin user:
```bash
node utils/createAdmin.js
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Certificates (Public)
- `GET /api/certificates/search/:certificateId` - Search certificate
- `GET /api/certificates/verify/:certificateId` - Verify certificate
- `GET /api/certificates/download/:certificateId` - Download certificate PDF
- `GET /api/certificates/stats` - Get certificate statistics

### Admin (Protected - Admin Only)
- `POST /api/admin/certificates/upload` - Upload Excel file with certificates
- `GET /api/admin/certificates` - Get all certificates (with pagination)
- `PUT /api/admin/certificates/:id` - Update certificate
- `DELETE /api/admin/certificates/:id` - Delete certificate
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

## Excel File Format

The Excel file should have the following columns:
- `certificateId` - Unique certificate ID
- `studentName` - Full name of the student
- `internshipDomain` - Domain/field of internship
- `startDate` - Start date (format: YYYY-MM-DD or Excel date)
- `endDate` - End date (format: YYYY-MM-DD or Excel date)
- `grade` - (Optional) Grade (A+, A, B+, B, C, Pass)

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- multer for file uploads
- xlsx for Excel parsing
- pdfkit for PDF generation
- helmet for security headers
- express-rate-limit for rate limiting
