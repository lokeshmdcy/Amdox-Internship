# Fix Dashboard & Upload Document Errors

## Problem Diagnosis ✅

After checking your system, here's what I found:

- ✅ **Backend server**: Running on port 5000
- ✅ **Frontend server**: Running on port 3000  
- ✅ **Database connection**: Working correctly
- ✅ **Admin user exists**: admin@example.com is active
- ✅ **Login works**: Returns valid JWT token
- ⚠️ **MAIN ISSUE**: Database has **0 certificates** - Dashboard expects data but there's nothing to show!

## Solution: Upload Sample Certificates First

### Step 1: Login to Admin Panel

1. Open browser: http://localhost:3000/login
2. Enter credentials:
   - Email: `admin@example.com`
   - Password: `Admin@123`
3. Click "Login"
4. You should see "Welcome, Admin" in the top-right navbar

### Step 2: Upload Sample Certificates (Excel File)

**This step is REQUIRED before the dashboard will work!**

1. After logging in, click **"Dashboard"** in the navbar
2. Scroll down to the **"Upload Certificates"** section
3. Click **"Choose File"**
4. Select the file: `sample-certificates.csv` 
   - Location: `C:\Users\LENOVO\Desktop\Amdox Internships\Certificate verification system\sample-certificates.csv`
5. Click **"Upload Certificates"**
6. Wait for success message: "Successfully uploaded X certificates"
7. **Now refresh the page** - you should see:
   - Dashboard statistics (Total, Active, etc.)
   - List of certificates in the table

### Step 3: Now Upload Documents Will Work

Once you have certificates in the database:

1. Click **"Upload Document"** in the navbar
2. Enter a Certificate ID from the list (e.g., `CERT2024001`)
3. Choose a PDF or image file
4. Click **"Upload Document"**
5. You should see success message!

## Why This Error Happened

The dashboard page calls this API endpoint:
```
GET /api/admin/dashboard/stats
```

This endpoint tries to calculate statistics from the `certificates` table. When the table is **empty**, it can cause issues.

**Solution**: Always upload certificates FIRST (via Excel), then upload documents.

## Common Errors & Fixes

### Error: "Error fetching statistics"
**Cause**: No certificates in database  
**Fix**: Upload sample-certificates.csv first

### Error: "Error fetching certificates"  
**Cause**: No certificates in database  
**Fix**: Upload sample-certificates.csv first

### Error: "Certificate not found" (when uploading documents)
**Cause**: Certificate ID doesn't exist in database  
**Fix**: 
1. Upload certificates first
2. Use exact Certificate ID from the dashboard table

### Error: "Network Error" or "Failed to fetch"
**Cause**: Backend or frontend not running  
**Fix**: 
1. Check both PowerShell windows are still open
2. If closed, double-click `QUICK_START.bat` to restart

### Error: "Unauthorized" or "Access denied"
**Cause**: Not logged in or token expired  
**Fix**: 
1. Logout and login again
2. Make sure you're using admin@example.com account

## Verify Everything Works

Run these tests in order:

### Test 1: Check Servers
Open http://localhost:5000/api/health in browser
- Should show: `{"status":"OK","message":"Server is running"}`

### Test 2: Login Works
1. Go to http://localhost:3000/login
2. Login with admin@example.com / Admin@123
3. Should redirect and show "Welcome, Admin" in navbar

### Test 3: Upload Certificates
1. Go to Dashboard
2. Upload sample-certificates.csv
3. Should show "Successfully uploaded X certificates"

### Test 4: View Dashboard
1. Refresh dashboard page
2. Should show:
   - Statistics cards at top
   - List of certificates in table
   - Each certificate shows ID, student name, domain, etc.

### Test 5: Upload Document
1. Click "Upload Document"
2. Enter Certificate ID: `CERT2024001`
3. Choose any PDF file
4. Click Upload
5. Should show success message
6. Go back to Dashboard - certificate row should now have "📄 View" link

## Complete Reset (If Still Having Issues)

If nothing works, do a complete reset:

```powershell
# 1. Stop all Node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Go to backend folder
cd "C:\Users\LENOVO\Desktop\Amdox Internships\Certificate verification system\backend"

# 3. Reset database (WARNING: Deletes all data!)
node -e "const {sequelize} = require('./config/database'); sequelize.sync({force: true}).then(() => console.log('Database reset')).catch(err => console.log(err));"

# 4. Recreate admin user
node utils/createAdmin.js

# 5. Restart servers
cd "C:\Users\LENOVO\Desktop\Amdox Internships\Certificate verification system"
.\QUICK_START.bat
```

## Still Not Working?

Check the browser console:
1. Open http://localhost:3000
2. Press F12 to open Developer Tools
3. Click "Console" tab
4. Look for errors (red text)
5. Share the error messages

Common console errors:
- `Network Error` = Backend not running
- `401 Unauthorized` = Login expired, need to login again  
- `404 Not Found` = Wrong API route (check backend routes)
- `500 Internal Server Error` = Check backend terminal for errors

## Summary

**The fix is simple:**

1. ✅ Make sure both servers are running
2. ✅ Login as admin
3. ✅ **Upload sample-certificates.csv FIRST**
4. ✅ Then dashboard will work
5. ✅ Then document upload will work

The dashboard error happens because it's trying to display certificates that don't exist yet!
