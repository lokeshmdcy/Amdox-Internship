# MySQL Setup Guide for Certificate Verification System

## Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v8.0 or higher)
- npm or yarn

## Step 1: Install MySQL

### Windows
1. Download MySQL Installer from https://dev.mysql.com/downloads/installer/
2. Run the installer and choose "Developer Default"
3. Set root password during installation
4. Complete the installation wizard

### macOS
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

## Step 2: Create Database

1. Login to MySQL:
```bash
mysql -u root -p
```

2. Create the database:
```sql
CREATE DATABASE certificate_db;
CREATE USER 'cert_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON certificate_db.* TO 'cert_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## Step 3: Configure Environment Variables

Update the `backend/.env` file with your MySQL credentials:

```env
# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=certificate_db
DB_USER=cert_user
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## Step 4: Install Dependencies

Navigate to the backend directory and install packages:

```bash
cd backend
npm install
```

The following MySQL-related packages are included:
- `sequelize` - Promise-based ORM for MySQL
- `mysql2` - MySQL client for Node.js

## Step 5: Initialize Database Tables

The application uses Sequelize to automatically create tables. Run:

```bash
node server.js
```

This will:
1. Connect to MySQL
2. Authenticate the connection
3. Sync models and create tables (User and Certificate)

You should see:
```
✅ MySQL Database connected successfully
🚀 Server is running on port 5000
```

## Step 6: Create Admin User

Run the admin creation script:

```bash
npm run create-admin
```

You should see:
```
✅ Connected to MySQL
✅ Admin user created successfully
Email: admin@example.com
Password: Admin@123
```

## Step 7: Verify Installation

1. Check if tables were created:
```bash
mysql -u cert_user -p certificate_db
```

```sql
SHOW TABLES;
```

You should see:
```
+---------------------------+
| Tables_in_certificate_db  |
+---------------------------+
| Certificates              |
| Users                     |
+---------------------------+
```

2. Check table structure:
```sql
DESCRIBE Users;
DESCRIBE Certificates;
```

## Step 8: Start the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Troubleshooting

### Connection Errors

**Error: Access denied for user**
- Check your DB_USER and DB_PASSWORD in .env
- Verify user privileges: `SHOW GRANTS FOR 'cert_user'@'localhost';`

**Error: Unknown database**
- Make sure you created the database: `CREATE DATABASE certificate_db;`

**Error: Can't connect to MySQL server**
- Check if MySQL is running: `sudo service mysql status`
- Verify DB_HOST and DB_PORT in .env

### Table Not Found Errors

If you get "Table doesn't exist" errors:

1. Stop the server
2. Drop and recreate the database:
```sql
DROP DATABASE certificate_db;
CREATE DATABASE certificate_db;
```
3. Restart the server to auto-create tables

### Foreign Key Constraint Errors

If you encounter foreign key errors:

1. Make sure models are properly associated
2. Check that uploadedBy references an existing user
3. Verify User table exists before Certificate table

## Database Schema

### Users Table
- `id` - Primary key (auto-increment)
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - User role (admin/user)
- `isActive` - Account status
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### Certificates Table
- `id` - Primary key (auto-increment)
- `certificateId` - Unique certificate identifier
- `studentName` - Student's name
- `internshipDomain` - Domain of internship
- `startingDate` - Internship start date
- `endingDate` - Internship end date
- `duration` - Duration in months
- `status` - Certificate status (active/revoked)
- `uploadedBy` - Foreign key to Users table
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

## Migration from MongoDB

If you're migrating from MongoDB:

1. Export data from MongoDB:
```bash
mongoexport --db certificate_db --collection certificates --out certificates.json
mongoexport --db certificate_db --collection users --out users.json
```

2. Create a migration script or manually import data
3. Update `_id` references to `id` (auto-increment integers)
4. Adjust date formats if necessary

## Backup and Restore

### Backup
```bash
mysqldump -u cert_user -p certificate_db > backup.sql
```

### Restore
```bash
mysql -u cert_user -p certificate_db < backup.sql
```

## Performance Optimization

1. **Indexes**: Sequelize automatically creates indexes on:
   - `email` (unique) in Users
   - `certificateId` (unique) in Certificates
   - `uploadedBy` (foreign key) in Certificates

2. **Connection Pooling**: Already configured in `config/database.js`:
   ```javascript
   pool: {
     max: 5,
     min: 0,
     acquire: 30000,
     idle: 10000
   }
   ```

3. **Query Optimization**: Use `.findOne()` instead of `.find()` when expecting single result

## Security Best Practices

1. **Never commit .env file** - It contains sensitive credentials
2. **Use strong passwords** for database users
3. **Limit database user privileges** - Don't use root for application
4. **Enable SSL/TLS** for production MySQL connections
5. **Regular backups** - Schedule daily backups
6. **Update dependencies** regularly for security patches

## Additional Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - GUI tool for database management

## Support

For issues or questions:
1. Check the error logs in the console
2. Review MySQL error log: `/var/log/mysql/error.log` (Linux) or MySQL data directory (Windows)
3. Consult Sequelize documentation for ORM-related queries
