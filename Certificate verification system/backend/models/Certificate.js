const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Certificate = sequelize.define('Certificate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  certificateId: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Certificate ID is required' }
    },
    set(value) {
      this.setDataValue('certificateId', value.toUpperCase());
    }
  },
  studentName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Student name is required' }
    }
  },
  internshipDomain: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Internship domain is required' }
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: 'Valid start date is required' }
    }
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: 'Valid end date is required' }
    }
  },
  duration: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  issuedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  grade: {
    type: DataTypes.ENUM('A+', 'A', 'B+', 'B', 'C', 'Pass'),
    defaultValue: 'Pass'
  },
  status: {
    type: DataTypes.ENUM('active', 'revoked', 'expired'),
    defaultValue: 'active'
  },
  documentPath: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Path to uploaded certificate document (PDF/Image)'
  },
  uploadedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'certificates',
  timestamps: true,
  hooks: {
    beforeSave: (certificate) => {
      if (certificate.startDate && certificate.endDate) {
        const start = new Date(certificate.startDate);
        const end = new Date(certificate.endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const months = Math.floor(diffDays / 30);
        const days = diffDays % 30;
        
        if (months > 0) {
          certificate.duration = `${months} month${months > 1 ? 's' : ''}${days > 0 ? ` ${days} day${days > 1 ? 's' : ''}` : ''}`;
        } else {
          certificate.duration = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
        }
      }
    }
  },
  indexes: [
    {
      unique: true,
      fields: ['certificateId']
    },
    {
      fields: ['studentName']
    }
  ]
});

module.exports = Certificate;
