const express = require('express');
const { sequelize } = require('./config/database');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const certificateRoutes = require('./routes/certificate');
const adminRoutes = require('./routes/admin');

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting - disabled for unrestricted access
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000 // very high limit - essentially unrestricted
});
// app.use(limiter); // Disabled

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// MySQL connection with Sequelize
sequelize.authenticate()
.then(() => {
  console.log('✅ MySQL connected successfully');
  // Sync database models (creates tables if they don't exist, updates columns)
  return sequelize.sync({ alter: true });
})
.then(() => console.log('✅ Database models synchronized'))
.catch((err) => console.error('❌ MySQL connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
