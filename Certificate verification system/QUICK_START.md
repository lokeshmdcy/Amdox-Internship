# Certificate Verification System - Quick Start Guide

## 🚀 Quick Installation

### Step 1: Install Backend Dependencies
```powershell
cd "Certificate verification system/backend"
npm install
```

### Step 2: Configure Backend
```powershell
# Copy environment file
copy .env.example .env

# Edit .env file (you can use notepad)
notepad .env
```

**Configure these in .env:**
- `DB_HOST` - MySQL host (default: localhost)
- `DB_PORT` - MySQL port (default: 3306)
- `DB_NAME` - Database name (e.g., certificate_db)
- `DB_USER` - MySQL username (e.g., cert_user)
- `DB_PASSWORD` - MySQL password
- `JWT_SECRET` - A random secret key for JWT
- `ADMIN_EMAIL` - Admin email (default: admin@example.com)
- `ADMIN_PASSWORD` - Admin password (default: Admin@123)

### Step 3: Install Frontend Dependencies
```powershell
# Open new terminal
cd "Certificate verification system/frontend"
npm install
```

### Step 4: Setup MySQL Database

**Install MySQL if not already installed:**
- Download from: https://dev.mysql.com/downloads/installer/
- Run installer and set root password

**Create database and user:**
```powershell
# Login to MySQL
mysql -u root -p

# Run these SQL commands
CREATE DATABASE certificate_db;
CREATE USER 'cert_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON certificate_db.* TO 'cert_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

For detailed MySQL setup, see [MYSQL_SETUP.md](MYSQL_SETUP.md)

### Step 5: Create Admin User
```powershell
# In backend directory
cd "Certificate verification system/backend"
node utils/createAdmin.js
```

### Step 6: Start Backend Server
```powershell
# In backend directory
npm run dev
```

Backend will run on: http://localhost:5000

### Step 7: Start Frontend Server
```powershell
# In new terminal, in frontend directory
cd "Certificate verification system/frontend"
npm start
```

Frontend will open automatically at: http://localhost:3000

## ✅ Verify Installation

1. Open http://localhost:3000
2. Click "Admin Login"
3. Login with:
   - Email: admin@example.com
   - Password: Admin@123
4. Upload the sample-certificates.csv file from the project root

## 📝 Quick Commands Reference

### Backend Commands
```powershell
cd "Certificate verification system/backend"
npm install          # Install dependencies
npm run dev         # Start development server
npm start           # Start production server
node utils/createAdmin.js  # Create admin user
```

### Frontend Commands
```powershell
cd "Certificate verification system/frontend"
npm install          # Install dependencies
npm start           # Start development server
npm run build       # Build for production
```

## 🎯 Default Credentials

**Admin:**
- Email: admin@example.com
- Password: Admin@123

## 📊 Testing the System

### Upload Certificates:
1. Login as admin
2. Go to Dashboard
3. Upload `sample-certificates.csv`
4. View upload results

### Search Certificate:
1. Go to "Search Certificate"
2. Enter: CERT2024001
3. View details
4. Download PDF

## 🐛 Common Issues

### "MongoDB connection failed"
- Ensure MongoDB is running
- Check MONGODB_URI in .env

### "Port 5000 already in use"
- Change PORT in backend/.env
- Update frontend/src/utils/api.js if needed

### "Port 3000 already in use"
- React will offer to run on different port
- Or stop other process using port 3000

### "Cannot find module"
- Run `npm install` in both backend and frontend

## 📞 Need Help?

Check the main README.md for detailed documentation.

## 🎉 You're Ready!

Your Certificate Verification System is now running!

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:3000/admin/dashboard
