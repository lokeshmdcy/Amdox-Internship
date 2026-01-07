const User = require('./User');
const Certificate = require('./Certificate');

// Define associations
User.hasMany(Certificate, {
  foreignKey: 'uploadedBy',
  as: 'certificates'
});

Certificate.belongsTo(User, {
  foreignKey: 'uploadedBy',
  as: 'uploader'
});

module.exports = {
  User,
  Certificate
};
