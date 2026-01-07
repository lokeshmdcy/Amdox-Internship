# Quick Start Guide - Admin Panel

## 🚀 Getting Started

### Step 1: Ensure Database is Updated
The database has been automatically synced to include the 'admin' role.

### Step 2: Admin User Created
Default admin credentials:
- **Email:** admin@jobportal.com
- **Password:** admin123456

### Step 3: Start the Application

#### Terminal 1 - Backend:
```bash
cd "c:\Users\LENOVO\Desktop\Amdox Internship\job-portal\backend"
npm run dev
```

#### Terminal 2 - Frontend:
```bash
cd "c:\Users\LENOVO\Desktop\Amdox Internship\job-portal\frontend"
npm start
```

### Step 4: Access Admin Panel

1. Open browser: `http://localhost:3000`
2. Click "Login"
3. Enter admin credentials
4. Click "Admin Panel" in navigation menu

## 📋 What You Can Do

### Overview Dashboard
- See total users, jobs, applications
- View recent activity
- Monitor platform statistics

### Manage Users
- View all registered users
- Filter by role (jobseeker/employer/admin)
- Delete users (except admins)
- Search by name or email

### Manage Jobs
- View all job postings
- Change job status (Active/Closed)
- Delete jobs
- Search by title or company

### Track Applications
- See all job applications
- Monitor application status
- View applicant details
- Track submission dates

## 🎯 Key Features

✅ **User Management**
- View, search, and delete users
- Role-based filtering
- Pagination for large datasets

✅ **Job Management**
- Control job visibility
- Update job status
- Remove inappropriate postings

✅ **Application Tracking**
- Monitor all applications
- Track hiring pipeline
- View applicant information

✅ **Dashboard Analytics**
- Real-time statistics
- Recent activity feed
- Platform health monitoring

## 🔐 Security

- JWT-based authentication
- Admin-only access control
- Protected API endpoints
- Role verification on every request

## 📊 Admin Capabilities

| Feature | Can View | Can Edit | Can Delete |
|---------|----------|----------|------------|
| Users | ✅ | ❌ | ✅ (except admins) |
| Jobs | ✅ | ✅ (status) | ✅ |
| Applications | ✅ | ✅ (status) | ❌ |
| Statistics | ✅ | ❌ | ❌ |

## 🛠️ Commands Reference

```bash
# Create admin user
npm run seed:admin

# Seed sample jobs
npm run seed

# Start backend in dev mode
npm run dev

# Start backend in production
npm start
```

## 📱 Access URLs

- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **Backend API:** http://localhost:5000
- **Admin API:** http://localhost:5000/api/admin/*

## ⚡ Quick Tips

1. **Change Password:** Update admin password after first login
2. **Regular Backups:** Backup database regularly
3. **Monitor Activity:** Check dashboard daily
4. **Review Jobs:** Ensure job postings are appropriate
5. **User Support:** Address user issues promptly

---

**You now have full admin control over your Job Portal! 🎉**
