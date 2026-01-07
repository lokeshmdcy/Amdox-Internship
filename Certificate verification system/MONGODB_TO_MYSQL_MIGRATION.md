# MongoDB to MySQL Migration Summary

## Changes Made

This document summarizes the changes made to convert the Certificate Verification System from MongoDB (Mongoose) to MySQL (Sequelize).

### 1. Dependencies Updated

**File:** `backend/package.json`

**Removed:**
- `mongoose: ^8.0.3`

**Added:**
- `sequelize: ^6.35.2`
- `mysql2: ^3.6.5`

### 2. Database Configuration

**File:** `backend/config/database.js` (NEW)
- Created Sequelize configuration with connection pooling
- Configured MySQL connection settings
- Added logging and error handling

**File:** `backend/.env`
Changed from:
```
MONGODB_URI=mongodb://localhost:27017/certificate_verification
```

To:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=certificate_db
DB_USER=cert_user
DB_PASSWORD=your_password
```

### 3. Server Configuration

**File:** `backend/server.js`

Changed from:
```javascript
mongoose.connect(process.env.MONGODB_URI)
```

To:
```javascript
sequelize.authenticate()
sequelize.sync()
```

### 4. Model Conversions

#### User Model (`backend/models/User.js`)

**Key Changes:**
- Mongoose Schema → Sequelize `define()`
- `_id` → `id` (auto-increment integer)
- `Schema.Types` → `DataTypes`
- `pre('save')` hook → `beforeCreate` and `beforeUpdate` hooks
- Instance methods preserved

**Before:**
```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }
})
```

**After:**
```javascript
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true }
})
```

#### Certificate Model (`backend/models/Certificate.js`)

**Key Changes:**
- Mongoose Schema → Sequelize `define()`
- `_id` → `id` (auto-increment integer)
- ObjectId references → INTEGER foreign keys
- `uppercase: true` → custom setter function
- `pre('save')` → `beforeSave` hook
- Indexes defined in model options

**Before:**
```javascript
uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
```

**After:**
```javascript
uploadedBy: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' } }
```

### 5. Model Associations

**File:** `backend/models/index.js` (NEW)

Created associations between models:
```javascript
User.hasMany(Certificate, { foreignKey: 'uploadedBy' })
Certificate.belongsTo(User, { foreignKey: 'uploadedBy' })
```

### 6. Controller Updates

#### Auth Controller (`backend/controllers/authController.js`)

**Query Changes:**
```javascript
// Before
User.findOne({ email })

// After
User.findOne({ where: { email } })
```

```javascript
// Before
const user = new User(userData)
await user.save()

// After
const user = await User.create(userData)
```

```javascript
// Before
user._id

// After
user.id
```

#### Certificate Controller (`backend/controllers/certificateController.js`)

**Query Changes:**
```javascript
// Before
Certificate.findOne({ certificateId })

// After
Certificate.findOne({ where: { certificateId } })
```

```javascript
// Before
Certificate.countDocuments()

// After
Certificate.count()
```

#### Admin Controller (`backend/controllers/adminController.js`)

**Search with Pattern Matching:**
```javascript
// Before
const query = {
  $or: [
    { studentName: { $regex: search, $options: 'i' } },
    { certificateId: { $regex: search, $options: 'i' } }
  ]
}

// After
const { Op } = require('sequelize')
const query = {
  [Op.or]: [
    { studentName: { [Op.like]: `%${search}%` } },
    { certificateId: { [Op.like]: `%${search}%` } }
  ]
}
```

**Pagination:**
```javascript
// Before
.skip(skip).limit(limit)

// After
{ offset: skip, limit }
```

**Populate/Include:**
```javascript
// Before
.populate('uploadedBy', 'name email')

// After
{ include: [{ model: User, as: 'uploader', attributes: ['name', 'email'] }] }
```

**Delete Operation:**
```javascript
// Before
Certificate.findByIdAndDelete(id)

// After
const certificate = await Certificate.findByPk(id)
await certificate.destroy()
```

**Update Operation:**
```javascript
// Before
Certificate.findByIdAndUpdate(id, updates, { new: true })

// After
const certificate = await Certificate.findByPk(id)
await certificate.update(updates)
```

**Aggregation (Dashboard Stats):**
```javascript
// Before
Certificate.aggregate([
  { $match: { status: 'active' } },
  { $group: { _id: '$internshipDomain', count: { $sum: 1 } } }
])

// After
Certificate.findAll({
  where: { status: 'active' },
  attributes: [
    'internshipDomain',
    [sequelize.fn('COUNT', sequelize.col('id')), 'count']
  ],
  group: ['internshipDomain']
})
```

### 7. Utility Scripts

**File:** `backend/utils/createAdmin.js`

**Changes:**
- `mongoose.connect()` → `sequelize.authenticate()`
- Added `User.sync()` to ensure table exists
- `User.findOne({ email })` → `User.findOne({ where: { email } })`
- `new User() + save()` → `User.create()`

### 8. Documentation Updates

Updated the following files to reflect MySQL:
- `README.md` - Changed stack description
- `QUICK_START.md` - Updated database setup instructions
- `SETUP_CHECKLIST.md` - Changed MongoDB steps to MySQL
- `backend/README.md` - Updated backend description
- `backend/.env.example` - Changed to MySQL configuration

**New Files Created:**
- `MYSQL_SETUP.md` - Comprehensive MySQL installation and setup guide
- `backend/models/index.js` - Model associations
- `MONGODB_TO_MYSQL_MIGRATION.md` - This file

## Key Differences: MongoDB vs MySQL with Sequelize

| Feature | MongoDB (Mongoose) | MySQL (Sequelize) |
|---------|-------------------|-------------------|
| Primary Key | `_id` (ObjectId) | `id` (INTEGER, auto-increment) |
| Queries | `find()`, `findOne()` | `findAll()`, `findOne({ where: {} })` |
| Create | `new Model()` + `save()` | `Model.create()` |
| Update | `findByIdAndUpdate()` | `findByPk()` + `update()` |
| Delete | `findByIdAndDelete()` | `findByPk()` + `destroy()` |
| Count | `countDocuments()` | `count()` |
| Pagination | `skip()`, `limit()` | `{ offset, limit }` |
| Relations | `populate()` | `{ include }` |
| Pattern Match | `{ $regex }` | `{ [Op.like]: '%value%' }` |
| Aggregation | `aggregate()` pipeline | `findAll({ group, attributes })` |
| Middleware | `pre()`, `post()` hooks | `beforeCreate`, `afterCreate`, etc. |

## Testing Recommendations

After migration, test the following:

1. **Authentication:**
   - User registration
   - User login
   - JWT token generation
   - Password hashing

2. **Certificate Management:**
   - Excel upload
   - Certificate search
   - Certificate verification
   - PDF download

3. **Admin Features:**
   - Dashboard statistics
   - Certificate listing with pagination
   - Certificate deletion
   - Certificate updates
   - Search functionality

4. **Database:**
   - Table creation (auto-sync)
   - Foreign key constraints
   - Indexes
   - Data integrity

5. **Performance:**
   - Connection pooling
   - Query optimization
   - Response times

## Rollback Plan

If you need to revert to MongoDB:

1. Restore `package.json` from version control
2. Restore all model files
3. Restore controller files
4. Restore `server.js`
5. Restore `.env` configuration
6. Run `npm install`
7. Restart the server

## Benefits of MySQL Migration

1. **ACID Compliance** - Full transactional support
2. **Structured Data** - Enforced schema and data types
3. **Joins** - Native support for complex queries
4. **Mature Ecosystem** - Wide tool support and hosting options
5. **Referential Integrity** - Foreign key constraints
6. **Better for Relational Data** - Certificates naturally relate to users

## Potential Issues and Solutions

### Issue: Auto-increment IDs vs ObjectIds

**Problem:** External systems might expect MongoDB ObjectIds

**Solution:** Keep `certificateId` as a unique string identifier, use `id` only internally

### Issue: Date Handling

**Problem:** MySQL DATE vs MongoDB ISODate

**Solution:** Sequelize automatically handles date conversion

### Issue: Case-Insensitive Search

**Problem:** MySQL default collation affects search

**Solution:** Use `COLLATE utf8mb4_general_ci` or `LOWER()` function

### Issue: Migration of Existing Data

**Problem:** Need to migrate data from MongoDB to MySQL

**Solution:**
1. Export from MongoDB using `mongoexport`
2. Transform data (change `_id` to `id`, adjust dates)
3. Import using MySQL LOAD DATA or Sequelize bulk insert

## Next Steps

1. ✅ Install MySQL Server
2. ✅ Create database and user
3. ✅ Update `.env` configuration
4. ✅ Run `npm install` to get Sequelize
5. ✅ Start server to auto-create tables
6. ✅ Create admin user
7. ✅ Test all endpoints
8. ✅ Verify PDF generation still works
9. ✅ Test Excel upload functionality
10. ✅ Load test with sample data

## Support

For issues related to:
- **Sequelize:** https://sequelize.org/docs/v6/
- **MySQL:** https://dev.mysql.com/doc/
- **Migration:** Consult the application README and MYSQL_SETUP.md
