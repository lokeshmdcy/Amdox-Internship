const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');

// Define associations
User.hasMany(Job, { foreignKey: 'employerId', as: 'jobs' });
Job.belongsTo(User, { foreignKey: 'employerId', as: 'employer' });

User.hasMany(Application, { foreignKey: 'jobSeekerId', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'jobSeekerId', as: 'jobSeeker' });

User.hasMany(Application, { foreignKey: 'employerId', as: 'receivedApplications' });
Application.belongsTo(User, { foreignKey: 'employerId', as: 'employer' });

Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

module.exports = { User, Job, Application };
