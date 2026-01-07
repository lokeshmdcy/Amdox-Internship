# Certificate Verification System - Setup Checklist

## Pre-Installation Checklist

- [ ] Node.js installed (v14+)
- [ ] npm installed (v6+)
- [ ] MySQL Server installed (v8.0+)
- [ ] Code editor installed (VS Code recommended)
- [ ] Git installed (optional)

## Backend Setup Checklist

- [ ] Navigate to backend directory
- [ ] Run `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Install and start MySQL server
- [ ] Create MySQL database (certificate_db)
- [ ] Create MySQL user (cert_user)
- [ ] Configure MySQL credentials in `.env`
- [ ] Set JWT_SECRET in `.env`
- [ ] Set admin credentials in `.env`
- [ ] Run `node utils/createAdmin.js` to create admin
- [ ] Start backend with `npm run dev`
- [ ] Verify backend running at http://localhost:5000
- [ ] Verify database tables created (Users, Certificates)

## Frontend Setup Checklist

- [ ] Navigate to frontend directory
- [ ] Run `npm install`
- [ ] (Optional) Create `.env` if using custom API URL
- [ ] Start frontend with `npm start`
- [ ] Verify frontend running at http://localhost:3000

## Testing Checklist

### Admin Features
- [ ] Login with admin credentials
- [ ] Access admin dashboard
- [ ] Upload sample Excel file
- [ ] View upload results
- [ ] See dashboard statistics
- [ ] View certificates list
- [ ] Delete a certificate
- [ ] Search certificates in admin panel

### Student Features
- [ ] Navigate to Search Certificate page
- [ ] Search for a valid certificate ID
- [ ] View certificate details
- [ ] Download certificate as PDF
- [ ] Verify PDF downloads correctly
- [ ] Test with invalid certificate ID

### Security Features
- [ ] Verify protected routes redirect to login
- [ ] Test logout functionality
- [ ] Verify non-admin users cannot access admin routes
- [ ] Test rate limiting (multiple rapid requests)

## Production Deployment Checklist

### Backend
- [ ] Change JWT_SECRET to strong random value
- [ ] Update admin credentials
- [ ] Set NODE_ENV to 'production'
- [ ] Configure production MongoDB URI
- [ ] Set up proper CORS origins
- [ ] Enable HTTPS
- [ ] Set up environment variables on hosting platform
- [ ] Configure file upload limits
- [ ] Set up logging
- [ ] Configure backup strategy

### Frontend
- [ ] Build production bundle (`npm run build`)
- [ ] Update API URL to production backend
- [ ] Configure hosting (Netlify, Vercel, etc.)
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS
- [ ] Configure environment variables

### Database
- [ ] Set up MongoDB Atlas or production database
- [ ] Configure database backups
- [ ] Set up monitoring
- [ ] Create database indexes
- [ ] Configure access controls

## Security Hardening Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable rate limiting
- [ ] Implement request size limits
- [ ] Add input sanitization
- [ ] Enable CORS with specific origins
- [ ] Use HTTPS only
- [ ] Implement password complexity rules
- [ ] Add account lockout after failed attempts
- [ ] Enable audit logging
- [ ] Regular security updates

## Maintenance Checklist

### Daily
- [ ] Check application logs
- [ ] Monitor error rates
- [ ] Verify backup completion

### Weekly
- [ ] Review user feedback
- [ ] Check database performance
- [ ] Monitor disk space usage

### Monthly
- [ ] Update dependencies (`npm audit`)
- [ ] Review and rotate logs
- [ ] Test backup restoration
- [ ] Review security alerts

## Troubleshooting Checklist

If something doesn't work:

1. **Backend Issues**
   - [ ] Check if MongoDB is running
   - [ ] Verify .env configuration
   - [ ] Check backend logs
   - [ ] Verify port 5000 is available
   - [ ] Check Node.js version compatibility

2. **Frontend Issues**
   - [ ] Check if backend is running
   - [ ] Verify API URL configuration
   - [ ] Clear browser cache
   - [ ] Check browser console for errors
   - [ ] Verify port 3000 is available

3. **Database Issues**
   - [ ] Verify MongoDB connection string
   - [ ] Check database credentials
   - [ ] Verify network connectivity
   - [ ] Check MongoDB logs

4. **Authentication Issues**
   - [ ] Verify JWT_SECRET is set
   - [ ] Check token expiration
   - [ ] Verify user credentials
   - [ ] Check localStorage for token

## Success Indicators

✅ Backend server running without errors
✅ Frontend accessible in browser
✅ Admin can login successfully
✅ Excel upload works correctly
✅ Certificates can be searched
✅ PDF download works
✅ All CRUD operations functional
✅ No console errors
✅ Responsive design works on mobile

## Next Steps After Setup

1. [ ] Customize certificate template design
2. [ ] Add email notifications
3. [ ] Implement certificate revocation
4. [ ] Add bulk certificate operations
5. [ ] Create user documentation
6. [ ] Set up monitoring and analytics
7. [ ] Implement automated testing
8. [ ] Add multi-language support (optional)
9. [ ] Create admin user management interface
10. [ ] Set up automated backups

---

**Setup Complete? Great! 🎉**

Your Certificate Verification System is ready to use!
