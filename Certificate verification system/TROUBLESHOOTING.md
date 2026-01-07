# QUICK FIX - Dashboard & Document Upload Access

## Problem
Cannot access dashboard or upload documents.

## Root Cause
⚠️ **Servers are not running!** Both backend and frontend must be running simultaneously.

---

## ✅ SOLUTION - Start Both Servers

### EASIEST METHOD - Double-click the file:
```
QUICK_START.bat
```
This file is in your project folder. Double-click it and wait for both servers to start.

---

### OR Manual Method:

#### Terminal 1 - Backend (MUST RUN FIRST)
```powershell
cd "C:\Users\LENOVO\Desktop\Amdox Internships\Certificate verification system\backend"
npm run dev
```

**Wait for these messages:**
```
✅ MySQL connected successfully
✅ Database models synchronized
🚀 Server running on port 5000
```

**✋ DO NOT CLOSE THIS WINDOW!**

---

#### Terminal 2 - Frontend (After backend starts)
Open a NEW terminal window:
```powershell
cd "C:\Users\LENOVO\Desktop\Amdox Internships\Certificate verification system\frontend"
npm start
```

**Wait for:**
```
Compiled successfully!
Local: http://localhost:3000
```

Browser should open automatically.

**✋ DO NOT CLOSE THIS WINDOW!**

---

## Access Instructions

### 1. Login as Admin

1. Go to: http://localhost:3000/login
2. Enter credentials:
   - **Email:** `admin@example.com`
   - **Password:** `Admin@123`
3. Click "Login"

**✅ You should see "Welcome, Admin" in the navbar**

---

### 2. Access Dashboard

After logging in, click **"Dashboard"** in the navbar

Or go directly to: http://localhost:3000/admin/dashboard

**You should see:**
- Statistics cards (total certificates, active certificates, total users)
- Upload Excel section
- Certificates list
- Pagination

---

### 3. Upload Documents

Click **"Upload Document"** in the navbar

Or go to: http://localhost:3000/admin/upload-document

**Steps:**
1. Enter Certificate ID (e.g., CERT2024001)
2. Click file upload area
3. Select PDF/JPG/PNG file (max 5MB)
4. Click "Upload Document"

---

## Troubleshooting Checklist

### ❌ "Cannot access dashboard"

**Check:**
- [ ] Both servers are running (check both terminal windows)
- [ ] You are logged in (see "Welcome, Admin" in navbar)
- [ ] Using correct URL: http://localhost:3000/admin/dashboard
- [ ] Browser console has no errors (Press F12)

**Fix:**
```javascript
// Open browser console (F12) and run:
localStorage.clear()
// Then login again
```

---

### ❌ "Cannot upload document"

**Check:**
- [ ] Backend server is running on port 5000
- [ ] You are logged in as admin
- [ ] Certificate ID exists in database
- [ ] File is PDF, JPG, JPEG, or PNG
- [ ] File size is under 5MB

**Quick Test:**
1. First upload the sample Excel file with certificates
2. Then try uploading a document for CERT2024001

---

### ❌ "Network Error"

**This means servers are NOT running!**

**Fix:**
1. Close all terminal windows
2. Double-click `QUICK_START.bat`
3. Wait for both servers to start
4. Try again

---

### ❌ "Page not found" or "Cannot GET"

**Backend is not running.**

**Fix:**
1. Open terminal
2. Run:
```powershell
cd "C:\Users\LENOVO\Desktop\Amdox Internships\Certificate verification system\backend"
npm run dev
```
3. Wait for "Server running on port 5000"

---

### ❌ "Access Denied" or "Forbidden"

**You are not logged in as admin.**

**Fix:**
1. Go to http://localhost:3000/login
2. Login with: `admin@example.com` / `Admin@123`
3. Check navbar shows "Welcome, Admin"
4. Try accessing dashboard again

---

## Quick Verification

### Test if servers are running:

**Backend Test:**
Open browser: http://localhost:5000/api/health

Should show: `{"status":"OK","message":"Server is running"}`

**Frontend Test:**
Open browser: http://localhost:3000

Should show the home page.

---

### Test Admin Login:

**PowerShell Test:**
```powershell
$body = '{"email":"admin@example.com","password":"Admin@123"}'
Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

Should return success with user data and token.

---

## Step-by-Step Complete Process

### 1. Start Servers ⚙️
   - Double-click `QUICK_START.bat`
   - OR run both servers manually
   - **Wait** for startup messages

### 2. Open Browser 🌐
   - Go to http://localhost:3000

### 3. Login 🔐
   - Click "Login"
   - Email: `admin@example.com`
   - Password: `Admin@123`
   - Click "Login" button

### 4. Verify Login ✅
   - Check navbar shows "Welcome, Admin"
   - You should see "Dashboard" and "Upload Document" links

### 5. Upload Certificates (Excel) 📊
   - Click "Dashboard"
   - Scroll to "Upload Certificates (Excel)"
   - Choose file: `sample-certificates.csv`
   - Click "Upload File"
   - Wait for success message

### 6. Upload Document 📄
   - Click "Upload Document"
   - Enter: CERT2024001
   - Select a PDF or image file
   - Click "Upload Document"
   - See success message

### 7. View in Dashboard 👀
   - Click "Dashboard"
   - Scroll to certificates list
   - You should see:
     - Certificate ID: CERT2024001
     - Document column shows "📄 View"
   - Click "📄 View" to open document

---

## Common Mistakes

### ❌ Closing server windows
**Problem:** Servers stop working
**Fix:** Keep both terminal windows open

### ❌ Not waiting for servers to start
**Problem:** "Network error" or "Cannot connect"
**Fix:** Wait for startup messages before accessing

### ❌ Trying to access without login
**Problem:** Redirected to login page
**Fix:** Login first, then access dashboard

### ❌ Wrong credentials
**Problem:** "Invalid email or password"
**Fix:** Use exact credentials: `admin@example.com` / `Admin@123`

### ❌ Using HTTP instead of HTTPS
**Problem:** None - use HTTP (http://localhost:3000)
**Note:** Do NOT use https://

---

## Still Not Working?

### Nuclear Option - Complete Reset:

```powershell
# 1. Kill all Node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Clear browser completely
# Press Ctrl+Shift+Delete → Clear all data for localhost

# 3. Start backend
cd "C:\Users\LENOVO\Desktop\Amdox Internships\Certificate verification system\backend"
npm run dev

# Wait for "Server running on port 5000"

# 4. NEW TERMINAL - Start frontend
cd "C:\Users\LENOVO\Desktop\Amdox Internships\Certificate verification system\frontend"
npm start

# Wait for "Compiled successfully"

# 5. Open INCOGNITO window
# Go to http://localhost:3000
# Login and try again
```

---

## Screenshots of What You Should See

### After Login:
```
Navbar should show:
[Home] [Search Certificate] [Dashboard] [Upload Document] [Welcome, Admin] [Logout]
```

### Dashboard Page:
```
- Statistics cards at top
- Upload Excel section
- Certificates table with pagination
- Each row has "Delete" button
- Document column shows "📄 View" or "No document"
```

### Upload Document Page:
```
- Certificate ID input
- File upload area (drag & drop)
- Upload button
- Instructions panel
```

---

## Contact Checklist Before Asking for Help

Before asking for help, confirm:

- [ ] Ran `QUICK_START.bat` or started both servers manually
- [ ] Backend shows "Server running on port 5000"
- [ ] Frontend shows "Compiled successfully"
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:5000/api/health
- [ ] Logged in with correct credentials
- [ ] See "Welcome, Admin" in navbar
- [ ] Tried in incognito/private browsing mode
- [ ] Checked browser console for errors (F12)
- [ ] Both server terminal windows are still open

---

## Summary

**The issue is simple: SERVERS MUST BE RUNNING!**

1. ✅ Double-click `QUICK_START.bat`
2. ✅ Wait for both servers to start
3. ✅ Login at http://localhost:3000/login
4. ✅ Access dashboard and upload documents

**That's it!** 🎉
