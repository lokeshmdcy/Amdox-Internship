const sequelize = require('./config/database');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await sequelize.sync();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@jobportal.com' } });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Email: admin@jobportal.com');
      console.log('Password: admin123456');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@jobportal.com',
      password: 'admin123456',
      role: 'admin',
      phone: '1234567890'
    });

    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: admin@jobportal.com');
    console.log('🔑 Password: admin123456');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
