# Admin Panel Guide

## 🛡️ Admin Dashboard Overview

The Job Portal Admin Panel provides comprehensive management capabilities for the entire platform.

## Admin Credentials

**Default Admin Account:**
- **Email:** `admin@jobportal.com`
- **Password:** `admin123456`

⚠️ **Important:** Change the password after first login!

## Features

### 1. 📊 Overview Dashboard
- **Statistics Cards:**
  - Total Users
  - Total Jobs
  - Total Applications
  - Active Jobs
  - Job Seekers Count
  - Employers Count

- **Recent Activity:**
  - Latest user registrations
  - Recently posted jobs
  - Recent job applications

### 2. 👥 User Management
- View all users with pagination
- Filter users by role (jobseeker, employer, admin)
- Search users by name or email
- Delete users (except admin users)
- View user details (name, email, role, join date)

### 3. 💼 Job Management
- View all job listings with pagination
- Filter jobs by status (active, closed)
- Search jobs by title or company name
- Update job status (active/closed)
- Delete jobs from the system
- View job details (title, company, location, type)

### 4. 📝 Application Management
- View all job applications
- Filter by application status
- See applicant details
- Track application dates
- Monitor job matching

## Accessing Admin Panel

### Step 1: Login
1. Navigate to `/login`
2. Enter admin credentials
3. Click "Login"

### Step 2: Access Dashboard
After login, click on **"Admin Panel"** in the navigation menu.

## Admin API Endpoints

### Dashboard Stats
```
GET /api/admin/dashboard/stats
```

### User Management
```
GET /api/admin/users?page=1&limit=10&role=jobseeker&search=john
DELETE /api/admin/users/:id
```

### Job Management
```
GET /api/admin/jobs?page=1&limit=10&status=active&search=developer
DELETE /api/admin/jobs/:id
PATCH /api/admin/jobs/:id/status
Body: { "status": "active" | "closed" }
```

### Application Management
```
GET /api/admin/applications?page=1&limit=10&status=pending
PATCH /api/admin/applications/:id/status
Body: { "status": "pending" | "accepted" | "rejected" }
```

### Analytics
```
GET /api/admin/analytics
```

## Security Features

- **Admin-Only Access:** All admin routes require admin role authentication
- **Token Verification:** JWT token validation on every request
- **Protected Operations:** Cannot delete admin users
- **Role-Based Authorization:** Only users with admin role can access

## Creating Additional Admin Users

To create more admin users, you can:

### Option 1: Use Database Directly
Update a user's role in the database:
```sql
UPDATE Users SET role = 'admin' WHERE email = 'user@example.com';
```

### Option 2: Modify Seed Script
Edit `backend/seedAdmin.js` to create additional admin accounts.

## Troubleshooting

### Cannot Access Admin Panel
- Verify you're logged in with admin credentials
- Check that your user role is 'admin' in the database
- Ensure JWT token is valid

### Admin Routes Return 403
- Make sure you're using the correct admin token
- Verify admin role in database
- Check that adminAuth middleware is working

### Database Sync Issues
Run database sync:
```bash
cd backend
npm run dev
```

The server will automatically sync the database schema on startup.

## Best Practices

1. **Security:**
   - Change default admin password immediately
   - Use strong passwords for admin accounts
   - Regularly review user access

2. **Data Management:**
   - Regularly backup database
   - Review and clean inactive jobs
   - Monitor application trends

3. **User Support:**
   - Review flagged content
   - Monitor user reports
   - Address employer concerns promptly

## Future Enhancements

Potential admin features to add:
- [ ] Site settings management
- [ ] Email template customization
- [ ] Advanced analytics and reports
- [ ] Bulk operations
- [ ] Activity logs and audit trails
- [ ] User ban/suspend functionality
- [ ] Featured job management
- [ ] Revenue and billing management

## Support

For admin-related issues or questions, contact the development team.
