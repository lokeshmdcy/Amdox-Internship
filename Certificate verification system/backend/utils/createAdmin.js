const { sequelize } = require('../config/database');
const User = require('../models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL');

    // Sync the User model to ensure table exists
    await User.sync();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' }
    });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
