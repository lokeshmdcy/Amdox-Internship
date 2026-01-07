# Getting Started with MySQL Backend

## ✅ Conversion Complete!

The Certificate Verification System has been successfully converted from MongoDB to MySQL.

## What Changed?

### Database
- **Before:** MongoDB with Mongoose ORM
- **After:** MySQL with Sequelize ORM

### Dependencies
- Removed: `mongoose`
- Added: `sequelize`, `mysql2`

### Configuration
- Environment variables changed from `MONGODB_URI` to MySQL connection details (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`)

## Quick Start Guide

### 1. Install MySQL

**Windows:**
```powershell
# Download and install MySQL from:
https://dev.mysql.com/downloads/installer/

# During installation, set a root password
```

**Verify installation:**
```powershell
mysql --version
```

### 2. Create Database

```powershell
# Login to MySQL
mysql -u root -p

# Enter your root password, then run:
```

```sql
CREATE DATABASE certificate_db;
CREATE USER 'cert_user'@'localhost' IDENTIFIED BY 'SecurePassword123!';
GRANT ALL PRIVILEGES ON certificate_db.* TO 'cert_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Install Backend Dependencies

```powershell
cd "Certificate verification system/backend"
npm install
```

This will install:
- `sequelize@^6.35.2` - ORM for MySQL
- `mysql2@^3.6.5` - MySQL driver
- All other existing dependencies

### 4. Configure Environment

```powershell
# Copy example file
copy .env.example .env

# Edit .env file
notepad .env
```

Update with your MySQL credentials:
```env
PORT=5000

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=certificate_db
DB_USER=cert_user
DB_PASSWORD=SecurePassword123!

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123
```

### 5. Start the Backend

```powershell
npm run dev
```

**On first run, Sequelize will:**
1. Connect to MySQL
2. Authenticate credentials
3. **Automatically create tables** (Users, Certificates)
4. Set up indexes and foreign keys

You should see:
```
✅ MySQL Database connected successfully
🚀 Server is running on port 5000
```

### 6. Create Admin User

```powershell
node utils/createAdmin.js
```

Output:
```
✅ Connected to MySQL
✅ Admin user created successfully
Email: admin@example.com
Password: Admin@123
```

### 7. Start Frontend

```powershell
# Open new terminal
cd "Certificate verification system/frontend"
npm install
npm start
```

### 8. Test the Application

1. **Open browser:** http://localhost:3000
2. **Login as admin:** admin@example.com / Admin@123
3. **Upload Excel file** with certificates
4. **Search for certificates**
5. **Download PDF**

## Verify Database Tables

```powershell
mysql -u cert_user -p certificate_db
```

```sql
-- Show tables
SHOW TABLES;

-- Expected output:
-- +---------------------------+
-- | Tables_in_certificate_db  |
-- +---------------------------+
-- | Certificates              |
-- | Users                     |
-- +---------------------------+

-- Check Users table structure
DESCRIBE Users;

-- Check Certificates table structure
DESCRIBE Certificates;

-- View admin user
SELECT id, name, email, role FROM Users;

-- Count certificates
SELECT COUNT(*) FROM Certificates;
```

## Common Issues & Solutions

### Issue: "Access denied for user"

**Solution:** Check credentials in `.env` match the MySQL user you created

### Issue: "Unknown database 'certificate_db'"

**Solution:** Run `CREATE DATABASE certificate_db;` in MySQL

### Issue: "Can't connect to MySQL server"

**Solution:**
```powershell
# Check if MySQL is running
Get-Service MySQL*

# Start MySQL if stopped
Start-Service MySQL80  # or your MySQL service name
```

### Issue: Tables not created

**Solution:**
1. Stop the server
2. Verify database exists
3. Restart server - Sequelize will auto-create tables on sync

### Issue: Port 3306 already in use

**Solution:** Change `DB_PORT` in `.env` to your MySQL port (check `my.ini` or `my.cnf`)

## Key Files Modified

| File | Change |
|------|--------|
| `backend/package.json` | Replaced mongoose with sequelize + mysql2 |
| `backend/.env.example` | Updated to MySQL configuration |
| `backend/config/database.js` | **NEW** - Sequelize configuration |
| `backend/server.js` | Changed from mongoose.connect to sequelize.authenticate |
| `backend/models/User.js` | Converted to Sequelize model |
| `backend/models/Certificate.js` | Converted to Sequelize model |
| `backend/models/index.js` | **NEW** - Model associations |
| `backend/controllers/authController.js` | Updated all queries to Sequelize syntax |
| `backend/controllers/certificateController.js` | Updated all queries to Sequelize syntax |
| `backend/controllers/adminController.js` | Updated all queries to Sequelize syntax |
| `backend/utils/createAdmin.js` | Converted to use Sequelize |

## Documentation

📚 **Read these guides:**

- **[MYSQL_SETUP.md](MYSQL_SETUP.md)** - Comprehensive MySQL installation guide
- **[MONGODB_TO_MYSQL_MIGRATION.md](MONGODB_TO_MYSQL_MIGRATION.md)** - Detailed migration summary
- **[QUICK_START.md](QUICK_START.md)** - Updated quick start guide
- **[README.md](README.md)** - Main project README

## Features Preserved

✅ All features remain identical:
- JWT authentication
- Excel bulk upload
- Certificate search & verification
- PDF generation
- Admin dashboard
- User management
- Security features (Helmet, rate limiting, CORS)

## What's Different (Internal)

| Feature | MongoDB | MySQL |
|---------|---------|-------|
| Primary Key | `_id` (ObjectId) | `id` (auto-increment) |
| Query Syntax | `find({field: value})` | `findOne({where: {field: value}})` |
| Search | `$regex` | `Op.like` with `%` |
| Relations | `populate()` | `include` |
| Create | `new Model().save()` | `Model.create()` |

**Note:** These are internal changes - the API endpoints and frontend remain unchanged!

## Testing Checklist

- [ ] Backend starts successfully
- [ ] Admin user created
- [ ] Login works
- [ ] Excel upload works
- [ ] Certificates appear in admin panel
- [ ] Certificate search works
- [ ] PDF download works
- [ ] Dashboard statistics display correctly
- [ ] Delete certificate works
- [ ] Update certificate works
- [ ] Pagination works
- [ ] Search/filter works

## Performance Notes

MySQL with Sequelize includes:
- **Connection pooling** (max 5 connections)
- **Automatic query optimization**
- **Indexes** on email, certificateId
- **Foreign key constraints** for data integrity

## Next Steps

1. ✅ Install MySQL
2. ✅ Create database and user
3. ✅ Configure `.env`
4. ✅ Install dependencies
5. ✅ Start backend (tables auto-create)
6. ✅ Create admin user
7. ✅ Start frontend
8. ✅ Test all features

## Need Help?

- MySQL errors: Check `MYSQL_SETUP.md`
- Migration details: Check `MONGODB_TO_MYSQL_MIGRATION.md`
- General setup: Check `README.md`

---

**You're all set! The application now uses MySQL instead of MongoDB. Start the backend and frontend to begin using it.** 🚀
