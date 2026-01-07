# Dashboard & Document Upload Access - COMPLETE GUIDE

## Quick Fix - Start Both Servers

### Terminal 1 - Backend Server
```powershell
cd "Certificate verification system\backend"
npm run dev
```

**Wait for these messages:**
```
✅ MySQL connected successfully
✅ Database models synchronized
🚀 Server running on port 5000
```

### Terminal 2 - Frontend Server
```powershell
cd "Certificate verification system\frontend"
npm start
```

**Wait for:**
```
Compiled successfully!
You can now view certificate-verification-frontend in the browser.
Local: http://localhost:3000
```

---

## Step-by-Step Login & Access Guide

### Step 1: Start Servers (Do This First!)

**Backend:**
1. Open PowerShell/Command Prompt
2. Navigate to backend directory
3. Run `npm run dev`
4. **DO NOT CLOSE THIS WINDOW**

**Frontend:**
1. Open NEW PowerShell/Command Prompt window
2. Navigate to frontend directory
3. Run `npm start`
4. Browser should open automatically to http://localhost:3000

### Step 2: Login as Admin

1. **Open Browser:** http://localhost:3000
2. **Click "Login"** button in navigation
3. **Enter Credentials:**
   - Email: `admin@example.com`
   - Password: `Admin@123`
4. **Click "Login"**

### Step 3: Access Dashboard

After successful login:
- You should see **"Welcome, Admin"** in navbar
- Click **"Dashboard"** link in navigation
- You should see admin dashboard with:
  - Statistics cards
  - Upload Excel file section
  - Certificates list

### Step 4: Upload Documents

- Click **"Upload Document"** in navigation
- Or navigate to: http://localhost:3000/admin/upload-document
- Enter Certificate ID
- Select file (PDF/JPG/PNG)
- Click "Upload Document"

---

## Common Issues & Solutions

### Issue 1: Cannot Access Dashboard

**Symptoms:**
- Redirected to home page or login
- "Access denied" message
- Dashboard link doesn't work

**Solutions:**

✅ **Check if logged in:**
```
Look for "Welcome, Admin" in navbar
If not visible, login again
```

✅ **Check user role:**
```javascript
// Open browser console (F12)
console.log(localStorage.getItem('user'))
// Should show: {"role":"admin",...}
```

✅ **Clear cache and login again:**
```javascript
// In browser console (F12)
localStorage.clear()
// Then login again
```

✅ **Verify backend is running:**
```powershell
# In PowerShell
Get-NetTCPConnection -LocalPort 5000
# Should show LISTEN state
```

### Issue 2: Cannot Upload Documents

**Symptoms:**
- Upload page not loading
- File upload fails
- "Network error" message

**Solutions:**

✅ **Check servers are running:**
```powershell
# Backend on port 5000
Get-NetTCPConnection -LocalPort 5000

# Frontend on port 3000
Get-NetTCPConnection -LocalPort 3000
```

✅ **Verify you're logged in as admin:**
```
Check navbar shows "Welcome, Admin"
Check "Upload Document" link is visible
```

✅ **Check file requirements:**
```
- File type: PDF, JPG, JPEG, PNG only
- File size: Maximum 5MB
- Certificate ID must exist in database
```

✅ **Check browser console for errors:**
```
Press F12 → Console tab
Look for error messages
```

### Issue 3: "Network Error" or "CORS Error"

**Cause:** Backend not running or wrong URL

**Solution:**
```powershell
# 1. Stop any running servers (Ctrl+C)

# 2. Start backend
cd "Certificate verification system\backend"
npm run dev

# 3. In NEW terminal, start frontend
cd "Certificate verification system\frontend"
npm start

# 4. Verify both are running:
# Backend: http://localhost:5000/api/health
# Frontend: http://localhost:3000
```

### Issue 4: "Token is not valid" Error

**Cause:** Expired or invalid JWT token

**Solution:**
```javascript
// Open browser console (F12)
localStorage.removeItem('token')
localStorage.removeItem('user')
// Then refresh page and login again
```

### Issue 5: Cannot Upload Excel File

**Symptoms:**
- Excel upload button doesn't work
- No response after selecting file

**Solutions:**

✅ **Check Excel file format:**
```csv
certificateId,studentName,internshipDomain,startDate,endDate,grade
CERT2024001,John Doe,Web Development,2024-01-01,2024-03-01,A+
```

✅ **Required columns:**
- certificateId (unique)
- studentName
- internshipDomain
- startDate (YYYY-MM-DD)
- endDate (YYYY-MM-DD)
- grade (optional)

✅ **Use sample file:**
```
Certificate verification system\sample-certificates.csv
```

---

## Testing Admin Access

### Test 1: Login API
```powershell
# Open PowerShell
$body = '{"email":"admin@example.com","password":"Admin@123"}'
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
$response.Content
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "Admin",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGci..."
  }
}
```

### Test 2: Dashboard Stats API
```powershell
# Replace YOUR_TOKEN with token from login response
$token = "YOUR_TOKEN_HERE"
$headers = @{Authorization = "Bearer $token"}
Invoke-WebRequest -Uri "http://localhost:5000/api/admin/dashboard/stats" -Headers $headers
```

### Test 3: Check LocalStorage
```javascript
// In browser console (F12)
console.log('Token:', localStorage.getItem('token'))
console.log('User:', localStorage.getItem('user'))
```

---

## Complete Startup Checklist

- [ ] MySQL is running
- [ ] Database `certificate_db` exists
- [ ] Admin user exists (email: admin@example.com)
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Frontend dependencies installed (`npm install` in frontend/)
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] Browser opened to http://localhost:3000
- [ ] Logged in as admin
- [ ] Can see Dashboard link in navbar
- [ ] Can see Upload Document link in navbar

---

## Detailed Access Flow

### 1. Backend Routes
```
POST   /api/auth/login                    → Login
GET    /api/admin/dashboard/stats         → Dashboard stats (Admin)
GET    /api/admin/certificates            → Get certificates (Admin)
POST   /api/admin/certificates/upload     → Upload Excel (Admin)
POST   /api/admin/documents/upload        → Upload document (Admin)
GET    /api/admin/documents/:certId       → Get document (Admin)
DELETE /api/admin/documents/:certId       → Delete document (Admin)
```

### 2. Frontend Routes
```
/                          → Home page (Public)
/login                     → Login page (Public)
/search                    → Search certificates (Public)
/admin/dashboard           → Admin Dashboard (Admin only)
/admin/upload-document     → Upload documents (Admin only)
```

### 3. Authentication Flow
```
1. User enters email/password
2. Frontend sends POST to /api/auth/login
3. Backend validates credentials
4. Backend returns JWT token
5. Frontend stores token in localStorage
6. Frontend includes token in all subsequent requests
7. Backend middleware validates token
8. Backend checks user role for admin routes
```

---

## Troubleshooting Commands

### Check if servers are running:
```powershell
# List all Node processes
Get-Process node

# Check port 5000 (backend)
Test-NetConnection localhost -Port 5000

# Check port 3000 (frontend)
Test-NetConnection localhost -Port 3000
```

### Restart servers:
```powershell
# Kill all Node processes
Get-Process node | Stop-Process -Force

# Start backend
cd "Certificate verification system\backend"
npm run dev

# Start frontend (new terminal)
cd "Certificate verification system\frontend"
npm start
```

### Check database connection:
```powershell
cd "Certificate verification system\backend"
node -e "const {sequelize} = require('./config/database'); sequelize.authenticate().then(() => console.log('Connected!')).catch(e => console.error(e));"
```

### Verify admin user:
```powershell
cd "Certificate verification system\backend"
node -e "const {sequelize} = require('./config/database'); const User = require('./models/User'); sequelize.authenticate().then(() => User.findOne({where: {email: 'admin@example.com'}})).then(u => console.log('Admin:', u ? 'EXISTS' : 'NOT FOUND'));"
```

---

## Manual Testing Guide

### Test Dashboard Access

1. **Start both servers**
2. **Open browser to** http://localhost:3000
3. **Login as admin**
4. **Expect to see:**
   - "Welcome, Admin" in navbar
   - "Dashboard" link
   - "Upload Document" link

5. **Click "Dashboard"**
6. **Expect to see:**
   - Total certificates count
   - Active certificates count
   - Total users count
   - Recent certificates table
   - Domain statistics
   - Upload Excel section
   - Certificates list with pagination

### Test Document Upload

1. **Ensure logged in as admin**
2. **Click "Upload Document"**
3. **Expect to see:**
   - Certificate ID input field
   - File upload area
   - Instructions panel

4. **Enter Certificate ID:** CERT2024001
5. **Select a PDF or image file**
6. **Click "Upload Document"**
7. **Expect to see:**
   - Success message
   - File details displayed
   - Upload result

### Test Excel Upload

1. **Go to Dashboard**
2. **Scroll to "Upload Certificates (Excel)"**
3. **Click "Choose File"**
4. **Select** `sample-certificates.csv`
5. **Click "Upload File"**
6. **Expect to see:**
   - Upload progress
   - Success/failed counts
   - Certificates appear in list below

---

## Browser Console Debugging

Open browser console (F12) and run these:

```javascript
// Check if logged in
const user = JSON.parse(localStorage.getItem('user'))
console.log('User:', user)
console.log('Is Admin:', user?.role === 'admin')

// Check token
const token = localStorage.getItem('token')
console.log('Token exists:', !!token)
console.log('Token:', token?.substring(0, 50) + '...')

// Test API call
fetch('http://localhost:5000/api/admin/dashboard/stats', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(r => r.json())
.then(data => console.log('Dashboard stats:', data))
.catch(err => console.error('Error:', err))
```

---

## If Nothing Works

### Nuclear Option - Fresh Start:

```powershell
# 1. Kill all Node processes
Get-Process node | Stop-Process -Force

# 2. Clear browser data
# - Open browser
# - Press Ctrl+Shift+Delete
# - Clear all site data for localhost

# 3. Restart backend
cd "Certificate verification system\backend"
npm run dev

# 4. Restart frontend (new terminal)
cd "Certificate verification system\frontend"
npm start

# 5. Open incognito/private window
# - Navigate to http://localhost:3000
# - Login: admin@example.com / Admin@123
# - Try accessing dashboard
```

---

## Support Checklist

Before asking for help, verify:

- [ ] Both servers are running (check terminal output)
- [ ] No errors in backend terminal
- [ ] No errors in frontend terminal
- [ ] Browser console shows no errors (F12)
- [ ] Logged in as admin (check navbar)
- [ ] Used correct credentials
- [ ] Admin user exists in database
- [ ] MySQL is running
- [ ] Tried in incognito/private window
- [ ] Cleared browser cache/localStorage

---

**After following this guide, you should be able to:**
✅ Access admin dashboard
✅ Upload Excel files
✅ Upload certificate documents
✅ View and manage certificates

If problems persist, check browser console (F12) for specific error messages.
