# Certificate Verification System
# File Index and Navigation Guide

## 📚 Quick Navigation

### 🚀 Getting Started (Read These First!)
1. [README.md](README.md) - Complete project documentation
2. [QUICK_START.md](QUICK_START.md) - Fast installation guide
3. [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) - Setup verification checklist
4. [SYSTEM_REQUIREMENTS.md](SYSTEM_REQUIREMENTS.md) - Prerequisites and requirements

### 📖 Reference Documentation
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Detailed project architecture and features
- [backend/README.md](backend/README.md) - Backend API documentation
- This file (FILE_INDEX.md) - File navigation guide

### ⚡ Quick Actions

#### First Time Setup
```powershell
# Run the automated setup script
.\setup.ps1
```

#### Start the Application
```powershell
# Run the automated start script
.\start.ps1
```

#### Manual Start
```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

---

## 📂 Directory Structure

```
Certificate verification system/
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICK_START.md              # Quick installation guide
├── 📄 SETUP_CHECKLIST.md          # Setup verification checklist
├── 📄 SYSTEM_REQUIREMENTS.md      # System prerequisites
├── 📄 PROJECT_OVERVIEW.md         # Detailed architecture docs
├── 📄 FILE_INDEX.md               # This file - navigation guide
├── 📄 sample-certificates.csv     # Sample data for testing
├── 📄 setup.ps1                   # Automated setup script
├── 📄 start.ps1                   # Automated start script
│
├── 📁 backend/                    # Backend server (Node.js/Express)
│   ├── 📁 controllers/            # Business logic
│   │   ├── authController.js      # Authentication logic
│   │   ├── certificateController.js # Certificate operations
│   │   └── adminController.js     # Admin operations
│   │
│   ├── 📁 middleware/             # Express middleware
│   │   ├── auth.js                # JWT verification
│   │   └── upload.js              # File upload handling
│   │
│   ├── 📁 models/                 # Database schemas
│   │   ├── User.js                # User model
│   │   └── Certificate.js         # Certificate model
│   │
│   ├── 📁 routes/                 # API routes
│   │   ├── auth.js                # Auth endpoints
│   │   ├── certificate.js         # Certificate endpoints
│   │   └── admin.js               # Admin endpoints
│   │
│   ├── 📁 utils/                  # Utility scripts
│   │   └── createAdmin.js         # Admin creation utility
│   │
│   ├── 📁 uploads/                # Temporary file storage
│   ├── 📄 .env                    # Environment configuration
│   ├── 📄 .env.example            # Environment template
│   ├── 📄 .gitignore              # Git ignore rules
│   ├── 📄 package.json            # Backend dependencies
│   ├── 📄 README.md               # Backend documentation
│   └── 📄 server.js               # Server entry point
│
└── 📁 frontend/                   # Frontend application (React)
    ├── 📁 public/                 # Static files
    │   └── index.html             # HTML template
    │
    ├── 📁 src/                    # React source code
    │   ├── 📁 components/         # Reusable components
    │   │   ├── Navbar.js          # Navigation bar
    │   │   └── PrivateRoute.js    # Route protection
    │   │
    │   ├── 📁 context/            # React context
    │   │   └── AuthContext.js     # Authentication state
    │   │
    │   ├── 📁 pages/              # Page components
    │   │   ├── Home.js            # Landing page
    │   │   ├── Login.js           # Login page
    │   │   ├── SearchCertificate.js # Certificate search
    │   │   └── AdminDashboard.js  # Admin panel
    │   │
    │   ├── 📁 utils/              # Utilities
    │   │   └── api.js             # API client config
    │   │
    │   ├── 📄 App.js              # Main app component
    │   ├── 📄 index.js            # React entry point
    │   └── 📄 index.css           # Global styles
    │
    ├── 📄 .gitignore              # Git ignore rules
    ├── 📄 package.json            # Frontend dependencies
    └── 📄 README.md               # Frontend documentation
```

---

## 🗺️ File Purpose Guide

### Configuration Files

| File | Purpose | When to Edit |
|------|---------|--------------|
| `backend/.env` | Backend environment variables | Initial setup, production deployment |
| `backend/package.json` | Backend dependencies | Adding new npm packages |
| `frontend/package.json` | Frontend dependencies | Adding new npm packages |
| `backend/.gitignore` | Git ignore patterns | Adding files to ignore |
| `frontend/.gitignore` | Git ignore patterns | Adding files to ignore |

### Documentation Files

| File | Content | Read When |
|------|---------|-----------|
| `README.md` | Complete project guide | First time setup |
| `QUICK_START.md` | Fast installation steps | Quick setup needed |
| `SETUP_CHECKLIST.md` | Verification checklist | Confirming installation |
| `SYSTEM_REQUIREMENTS.md` | Prerequisites | Before installation |
| `PROJECT_OVERVIEW.md` | Architecture details | Understanding system |
| `FILE_INDEX.md` | This navigation guide | Finding specific files |

### Backend Files

#### Controllers (Business Logic)
- `authController.js` - Login, register, profile management
- `certificateController.js` - Search, verify, download certificates
- `adminController.js` - Excel upload, certificate CRUD, statistics

#### Models (Database Schemas)
- `User.js` - User data structure and validation
- `Certificate.js` - Certificate data structure and validation

#### Routes (API Endpoints)
- `auth.js` - Authentication endpoints
- `certificate.js` - Certificate public endpoints
- `admin.js` - Admin protected endpoints

#### Middleware
- `auth.js` - JWT verification and role checking
- `upload.js` - File upload configuration

#### Core Files
- `server.js` - Application entry point
- `utils/createAdmin.js` - Admin user creation script

### Frontend Files

#### Pages (Main Views)
- `Home.js` - Landing page with features
- `Login.js` - Admin/user login page
- `SearchCertificate.js` - Certificate search and download
- `AdminDashboard.js` - Admin control panel

#### Components (Reusable UI)
- `Navbar.js` - Navigation bar component
- `PrivateRoute.js` - Protected route wrapper

#### Context (State Management)
- `AuthContext.js` - Authentication state and functions

#### Utils
- `api.js` - Axios configuration and interceptors

#### Core Files
- `App.js` - Main application component
- `index.js` - React DOM rendering
- `index.css` - Global styles

---

## 🔍 Finding Specific Functionality

### Looking for Authentication Code?
- Backend: `backend/controllers/authController.js`
- Backend Routes: `backend/routes/auth.js`
- Frontend Context: `frontend/src/context/AuthContext.js`
- Frontend UI: `frontend/src/pages/Login.js`
- Middleware: `backend/middleware/auth.js`

### Looking for Certificate Search?
- Backend Controller: `backend/controllers/certificateController.js`
- Backend Routes: `backend/routes/certificate.js`
- Frontend UI: `frontend/src/pages/SearchCertificate.js`

### Looking for Excel Upload?
- Backend Controller: `backend/controllers/adminController.js`
- Upload Middleware: `backend/middleware/upload.js`
- Frontend UI: `frontend/src/pages/AdminDashboard.js`

### Looking for PDF Generation?
- Backend: `backend/controllers/certificateController.js` (downloadCertificate function)

### Looking for Database Models?
- User Model: `backend/models/User.js`
- Certificate Model: `backend/models/Certificate.js`

### Looking for API Configuration?
- Frontend: `frontend/src/utils/api.js`
- Backend: `backend/server.js`

---

## 📋 Common Tasks

### Adding a New Feature

1. **Backend:**
   - Add logic in appropriate controller
   - Create route in routes folder
   - Update model if needed
   - Add middleware if needed

2. **Frontend:**
   - Create component/page
   - Add route in App.js
   - Update navigation if needed
   - Add API call in utils/api.js

### Modifying Certificate Template

Edit: `backend/controllers/certificateController.js`
Function: `downloadCertificate`

### Changing Authentication Logic

Edit: `backend/controllers/authController.js`
Middleware: `backend/middleware/auth.js`

### Updating UI Styles

Global: `frontend/src/index.css`
Component-specific: Inline styles in component files

### Adding New Routes

Backend: `backend/routes/*.js`
Frontend: `frontend/src/App.js`

---

## 🎓 Learning Path

### For Beginners
1. Read [README.md](README.md)
2. Check [SYSTEM_REQUIREMENTS.md](SYSTEM_REQUIREMENTS.md)
3. Follow [QUICK_START.md](QUICK_START.md)
4. Use [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)
5. Explore [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)

### For Developers
1. Review [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)
2. Study `backend/server.js` - understand server setup
3. Review `backend/models/` - understand data structure
4. Check `backend/controllers/` - understand business logic
5. Explore `frontend/src/App.js` - understand routing
6. Review `frontend/src/pages/` - understand UI components

### For Deployment
1. Review production checklist in [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)
2. Update `backend/.env` for production
3. Build frontend: `cd frontend && npm run build`
4. Deploy backend to hosting platform
5. Deploy frontend to hosting platform
6. Configure MongoDB Atlas
7. Test all functionality

---

## 🆘 Troubleshooting References

### Installation Issues
- Check [SYSTEM_REQUIREMENTS.md](SYSTEM_REQUIREMENTS.md)
- Review [QUICK_START.md](QUICK_START.md)
- Follow [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)

### Backend Errors
- Check `backend/server.js` for configuration
- Verify `backend/.env` settings
- Review `backend/models/` for schema issues

### Frontend Errors
- Check `frontend/src/utils/api.js` for API config
- Verify `frontend/src/context/AuthContext.js` for auth issues
- Review browser console for errors

### Database Issues
- Verify MongoDB connection in `backend/.env`
- Check `backend/models/` for schema validation
- Review MongoDB logs

---

## 📞 Quick Reference

### Default Ports
- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- MongoDB: mongodb://localhost:27017

### Default Credentials
- Email: admin@example.com
- Password: Admin@123

### Important Commands
```powershell
# Setup
.\setup.ps1

# Start
.\start.ps1

# Manual backend start
cd backend
npm run dev

# Manual frontend start
cd frontend
npm start

# Create admin
cd backend
node utils/createAdmin.js
```

---

**Navigation Tips:**
- Use Ctrl+F to search for specific files
- File paths are clickable in most editors
- Check file headers for detailed descriptions

**Last Updated:** Initial Release
**Maintained By:** Amdox Internships Program
