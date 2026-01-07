# User Registration Feature - Complete Guide

## ✅ Registration Feature Added!

Users can now create accounts to access the Certificate Verification System.

## Features Added

### Frontend
- ✅ **Registration Page** - Beautiful, user-friendly registration form
- ✅ **Form Validation** - Client-side validation for all fields
- ✅ **Password Confirmation** - Ensures passwords match
- ✅ **Success/Error Messages** - Toast notifications for feedback
- ✅ **Auto Login** - Users are automatically logged in after registration
- ✅ **Navigation Links** - Register links in navbar, login page, and home page

### Backend
- ✅ **Registration API** - `/api/auth/register` endpoint
- ✅ **Email Validation** - Checks for valid email format
- ✅ **Duplicate Prevention** - Prevents duplicate email addresses
- ✅ **Password Hashing** - Secure bcrypt password encryption
- ✅ **JWT Token** - Automatic token generation
- ✅ **Input Validation** - Server-side validation rules

## How to Register

### Step 1: Access Registration Page

**Option 1 - From Home Page:**
1. Go to http://localhost:3000
2. Click **"✨ Create Account"** button

**Option 2 - From Login Page:**
1. Go to http://localhost:3000/login
2. Click **"Register here"** link

**Option 3 - From Navbar:**
1. Click **"Register"** button in the navigation bar

**Option 4 - Direct URL:**
- Navigate to http://localhost:3000/register

### Step 2: Fill Registration Form

**Required Fields:**
1. **Full Name** - Your complete name
2. **Email Address** - Valid email (must be unique)
3. **Password** - At least 6 characters
4. **Confirm Password** - Must match password

**Example:**
```
Full Name: John Doe
Email: john.doe@example.com
Password: SecurePass123
Confirm Password: SecurePass123
```

### Step 3: Submit

1. Click **"Create Account"** button
2. Wait for confirmation message
3. You'll be automatically logged in
4. Redirected to home page

## User vs Admin Accounts

### Regular User Account (Registration)
- ✅ Can search for certificates
- ✅ Can verify certificates
- ✅ Can download certificate PDFs
- ❌ Cannot access admin dashboard
- ❌ Cannot upload certificates
- ❌ Cannot upload documents

### Admin Account (Pre-configured)
- ✅ All user permissions
- ✅ Access admin dashboard
- ✅ Upload certificates via Excel
- ✅ Upload certificate documents
- ✅ Manage all certificates
- ✅ View statistics

**Admin credentials:**
- Email: `admin@example.com`
- Password: `Admin@123`

## Validation Rules

### Name Validation
- ✅ Required field
- ✅ Cannot be empty
- ✅ Minimum 1 character

### Email Validation
- ✅ Required field
- ✅ Must be valid email format
- ✅ Must be unique (not already registered)
- ❌ Cannot use existing email

### Password Validation
- ✅ Required field
- ✅ Minimum 6 characters
- ✅ Can contain letters, numbers, symbols
- ❌ No maximum length limit

### Confirm Password
- ✅ Must match password field
- ✅ Cannot submit if passwords don't match

## Testing Registration

### Test Case 1: Successful Registration
```
Name: Test User
Email: testuser@example.com
Password: Test123
Confirm: Test123

Expected: ✅ Success message, auto login, redirect to home
```

### Test Case 2: Duplicate Email
```
Email: admin@example.com (already exists)

Expected: ❌ Error "User already exists with this email"
```

### Test Case 3: Password Mismatch
```
Password: Test123
Confirm: Test456

Expected: ❌ Error "Passwords do not match"
```

### Test Case 4: Short Password
```
Password: 12345 (only 5 characters)

Expected: ❌ Error "Password must be at least 6 characters"
```

### Test Case 5: Invalid Email
```
Email: notanemail

Expected: ❌ Error "Valid email is required"
```

### Test Case 6: Empty Fields
```
Leave any field empty

Expected: ❌ Error "Please fill in all fields"
```

## API Endpoint

### Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 2,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2025-12-31T10:00:00.000Z",
      "updatedAt": "2025-12-31T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

## Files Modified/Created

### New Files
1. `frontend/src/pages/Register.js` - Registration page component

### Modified Files
1. `frontend/src/App.js` - Added `/register` route
2. `frontend/src/pages/Login.js` - Added register link
3. `frontend/src/pages/Home.js` - Added "Create Account" button
4. `frontend/src/components/Navbar.js` - Added "Register" button

### Existing Backend (Already Configured)
- `backend/routes/auth.js` - Registration route
- `backend/controllers/authController.js` - Register logic
- `backend/models/User.js` - User model with password hashing

## User Flow

### Registration Flow
```
1. User clicks "Register" → Navigate to /register
2. User fills form → Client-side validation
3. User submits → POST /api/auth/register
4. Backend validates → Check duplicate email
5. Backend creates user → Hash password
6. Backend generates token → Return user + token
7. Frontend stores token → localStorage
8. Frontend updates context → User logged in
9. Redirect to home → Show welcome message
```

### After Registration
```
Logged In User Can:
- Search certificates
- View certificate details
- Download PDFs
- Update their profile
- Logout

Logged In User Cannot:
- Access admin dashboard (403 Forbidden)
- Upload certificates
- Upload documents
- View all certificates list
```

## Security Features

### Password Security
- ✅ **Bcrypt Hashing** - Passwords never stored in plain text
- ✅ **Salt Rounds: 10** - Strong hash generation
- ✅ **One-way Encryption** - Cannot reverse engineer

### Token Security
- ✅ **JWT Tokens** - Secure authentication
- ✅ **7 Day Expiry** - Automatic logout after 7 days
- ✅ **Secret Key** - Signed with JWT_SECRET
- ✅ **HTTP Only** - Stored in localStorage

### Input Validation
- ✅ **Client-side** - Immediate feedback
- ✅ **Server-side** - Backend validation
- ✅ **Sanitization** - Trim whitespace
- ✅ **Type Checking** - Email format validation

## Troubleshooting

### Issue: "User already exists"
**Cause:** Email is already registered

**Solution:**
- Use different email address
- Try logging in instead
- Use password reset (if implemented)

### Issue: "Passwords do not match"
**Cause:** Password and Confirm Password fields don't match

**Solution:**
- Re-type both passwords carefully
- Check caps lock is off
- Ensure no extra spaces

### Issue: "Password must be at least 6 characters"
**Cause:** Password is too short

**Solution:**
- Use minimum 6 characters
- Recommended: Mix letters, numbers, symbols
- Example: `MyPass123!`

### Issue: "Network Error"
**Cause:** Backend server not running

**Solution:**
```powershell
# Start backend
cd "Certificate verification system\backend"
npm run dev
```

### Issue: Registration succeeds but not logged in
**Cause:** Token not stored properly

**Solution:**
```javascript
// Open browser console (F12)
localStorage.clear()
// Try registering again
```

## Testing with API

### Using PowerShell
```powershell
# Test registration
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "Test123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

### Using cURL
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123"
  }'
```

## Database Verification

### Check registered users
```powershell
cd "Certificate verification system\backend"
node -e "
const {sequelize} = require('./config/database');
const User = require('./models/User');
sequelize.authenticate()
  .then(() => User.findAll({ attributes: ['id', 'name', 'email', 'role', 'isActive'] }))
  .then(users => console.log('Users:', users.map(u => u.toJSON())))
"
```

### Count users
```powershell
node -e "
const {sequelize} = require('./config/database');
const User = require('./models/User');
sequelize.authenticate()
  .then(() => User.count({ where: { role: 'user' } }))
  .then(count => console.log('Total Users:', count))
"
```

## Best Practices for Users

### Creating Strong Passwords
- ✅ Use at least 8 characters (minimum is 6)
- ✅ Mix uppercase and lowercase letters
- ✅ Include numbers
- ✅ Add special characters
- ❌ Don't use common words
- ❌ Don't use personal information

**Good Examples:**
- `SecurePass2024!`
- `MyStr0ng#Pass`
- `Cert!f1cate99`

**Bad Examples:**
- `password` (too common)
- `123456` (too simple)
- `admin` (too weak)

### Email Recommendations
- ✅ Use valid email you can access
- ✅ Use professional email
- ✅ Double-check for typos
- ❌ Don't use temporary emails
- ❌ Don't share accounts

## Future Enhancements

Potential features to add:
- [ ] Email verification
- [ ] Password reset/forgot password
- [ ] Profile picture upload
- [ ] Two-factor authentication (2FA)
- [ ] Social login (Google, GitHub)
- [ ] Account settings page
- [ ] Delete account option
- [ ] Change password functionality
- [ ] Email notifications

## Quick Reference

### Registration URLs
- Direct: http://localhost:3000/register
- From home: Click "✨ Create Account"
- From login: Click "Register here"
- From navbar: Click "Register"

### After Registration
- Automatically logged in
- Token stored in localStorage
- User info in localStorage
- Redirected to home page
- Can immediately search certificates

### Logout
- Click "Logout" in navbar
- Clears localStorage
- Redirects to home
- Can register/login again

---

**Users can now create accounts and access the certificate verification features!** 🎉
