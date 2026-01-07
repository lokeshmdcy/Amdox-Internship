# Certificate Verification System

A full-stack web application built with MySQL, Express.js, React.js, and Node.js for managing and verifying internship certificates.

## 🌟 Features

### User Features
- 🔍 **Certificate Search** - Search certificates using unique certificate ID
- ✅ **Certificate Verification** - Verify certificate authenticity
- 📄 **PDF Download** - Download certificates in professional PDF format
- 🔒 **Secure Access** - All data is encrypted and securely stored

### Admin Features
- 👤 **User Management** - Create and manage admin and user accounts
- 📊 **Excel Upload** - Bulk upload student data via Excel files
- 📋 **Certificate Management** - View, edit, and delete certificates
- 📈 **Dashboard Statistics** - View comprehensive analytics
- 🔐 **Secure Authentication** - JWT-based authentication with role management

## 🛠️ Technologies Used

### Backend
- Node.js & Express.js
- MySQL with Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing
- multer for file uploads
- xlsx for Excel parsing
- pdfkit for PDF generation
- helmet for security headers
- express-rate-limit for rate limiting

### Frontend
- React.js 18
- React Router for navigation
- Axios for API calls
- React Toastify for notifications
- React Icons

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v8.0 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone or Navigate to the Project
```bash
cd "Certificate verification system"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your MySQL configurations:
# - MySQL connection details (host, port, database, user, password)
# - JWT secret key
# - Port number
# - Admin credentials

# Create admin user
node utils/createAdmin.js

# Start the backend server
npm run dev
```

The backend server will run on http://localhost:5000

**Note**: Before running the backend, make sure MySQL is installed and running. See [MYSQL_SETUP.md](MYSQL_SETUP.md) for detailed MySQL installation and configuration instructions.

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will run on http://localhost:3000

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=certificate_db
DB_USER=cert_user
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123
```

### Frontend (optional .env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📊 Excel File Format

When uploading certificates via Excel, use the following format:

| certificateId | studentName | internshipDomain | startDate | endDate | grade (optional) |
|--------------|-------------|------------------|-----------|---------|------------------|
| CERT2024001 | John Doe | Web Development | 2024-01-01 | 2024-03-01 | A+ |
| CERT2024002 | Jane Smith | Data Science | 2024-02-01 | 2024-04-01 | A |

**Column Details:**
- `certificateId` - Unique identifier (required, will be auto-converted to uppercase)
- `studentName` - Full name of the student (required)
- `internshipDomain` - Field/domain of internship (required)
- `startDate` - Start date in YYYY-MM-DD format or Excel date (required)
- `endDate` - End date in YYYY-MM-DD format or Excel date (required)
- `grade` - Optional grade (A+, A, B+, B, C, Pass)

## 🔑 Default Admin Credentials

```
Email: admin@example.com
Password: Admin@123
```

**⚠️ Important:** Change these credentials in production!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Certificates (Public)
- `GET /api/certificates/search/:certificateId` - Search certificate
- `GET /api/certificates/verify/:certificateId` - Verify certificate
- `GET /api/certificates/download/:certificateId` - Download PDF

### Admin (Protected)
- `POST /api/admin/certificates/upload` - Upload Excel file
- `GET /api/admin/certificates` - Get all certificates
- `PUT /api/admin/certificates/:id` - Update certificate
- `DELETE /api/admin/certificates/:id` - Delete certificate
- `GET /api/admin/dashboard/stats` - Get statistics

## 🎯 Usage Guide

### For Students
1. Navigate to the home page
2. Click "Search Certificate" or go to /search
3. Enter your certificate ID
4. View your certificate details
5. Click "Download Certificate PDF" to save

### For Administrators
1. Login with admin credentials at /login
2. Access the admin dashboard
3. Upload Excel file with student data
4. View upload results (success, failed, duplicates)
5. Manage certificates (view, delete)
6. View statistics and analytics

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Helmet security headers
- Rate limiting
- Input validation
- Role-based access control
- Secure session management

## 📁 Project Structure

```
Certificate verification system/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── utils/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify network access (if using MongoDB Atlas)

### Port Already in Use
- Change PORT in backend .env file
- Update REACT_APP_API_URL in frontend if needed

### CORS Errors
- Verify frontend URL in backend CORS configuration
- Check API_URL in frontend configuration

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Support

For issues or questions, please check:
1. Environment variables are correctly set
2. All dependencies are installed
3. MongoDB is running
4. Ports are not in use by other applications

## 🎓 Created By

Amdox Internships Program

---

**Happy Certificate Verification! 🎉**
