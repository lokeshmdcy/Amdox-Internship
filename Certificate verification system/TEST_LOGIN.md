# Admin Login Issue - RESOLVED ✅

## Issue
Unable to login to admin account.

## Root Causes Found & Fixed

### 1. ✅ Database Name Mismatch
**Problem:** `.env` had `DB_NAME=certificate_verification` but actual database was `certificate_db`
**Solution:** Updated `.env` to use `DB_NAME=certificate_db`

### 2. ✅ Admin User Not Created
**Problem:** Admin user didn't exist in database
**Solution:** Fixed `createAdmin.js` import and created admin user

### 3. ✅ Import Error in createAdmin.js
**Problem:** `const sequelize = require('./config/database')` was incorrect
**Solution:** Changed to `const { sequelize } = require('./config/database')`

## Admin Credentials

**Email:** `admin@example.com`  
**Password:** `Admin@123`

## Verification Results

✅ Database connection: Working  
✅ Admin user exists: Yes  
✅ Admin user active: Yes  
✅ Password hash: Correct  
✅ Password verification: Working  

## How to Login

### Step 1: Start Backend Server

```powershell
cd "Certificate verification system\backend"
npm run dev
```

You should see:
```
✅ MySQL Database connected successfully
✅ Database models synchronized
🚀 Server is running on port 5000
```

### Step 2: Start Frontend

Open a new terminal:

```powershell
cd "Certificate verification system\frontend"
npm start
```

### Step 3: Login

1. Open browser: http://localhost:3000
2. Click "Login"
3. Enter credentials:
   - Email: `admin@example.com`
   - Password: `Admin@123`
4. Click Login button

## Testing Login via API (Optional)

You can test the login endpoint directly:

```powershell
# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@example.com\",\"password\":\"Admin@123\"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "Admin",
      "email": "admin@example.com",
      "role": "admin",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Troubleshooting

### If backend won't start

1. Check if port 5000 is in use:
```powershell
netstat -ano | findstr :5000
```

2. Check MySQL is running:
```powershell
Get-Service | Where-Object {$_.Name -like "*mysql*"}
```

3. Verify database exists:
```powershell
# If MySQL CLI is available
mysql -u root -p
# Then run: SHOW DATABASES;
```

### If login still fails

1. **Check browser console** (F12) for errors
2. **Check backend logs** - look for error messages
3. **Verify credentials** - make sure caps lock is off
4. **Clear browser cache** and cookies
5. **Try incognito/private window**

### Common Login Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Invalid email or password" | Wrong credentials | Use `admin@example.com` / `Admin@123` |
| "Network Error" | Backend not running | Start backend with `npm run dev` |
| "Account is deactivated" | User inactive | Admin is active (verified ✅) |
| CORS error | Frontend/backend mismatch | Check both servers running |

## Quick Start Commands

```powershell
# Terminal 1 - Backend
cd "Certificate verification system\backend"
npm run dev

# Terminal 2 - Frontend  
cd "Certificate verification system\frontend"
npm start

# Terminal 3 - Test login (optional)
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@example.com\",\"password\":\"Admin@123\"}'
```

## What Was Fixed

1. **File:** `backend\.env`
   - Changed: `DB_NAME=certificate_verification` → `DB_NAME=certificate_db`

2. **File:** `backend\utils\createAdmin.js`
   - Changed: `const sequelize = require(...)` → `const { sequelize } = require(...)`

3. **Action:** Created admin user
   - Ran: `node utils/createAdmin.js`
   - Result: Admin created successfully ✅

## Next Steps

1. ✅ Start backend server
2. ✅ Start frontend server
3. ✅ Login with admin credentials
4. ✅ Access admin dashboard
5. ✅ Upload certificates
6. ✅ Upload documents

---

**All issues resolved! You should now be able to login successfully.** 🎉
