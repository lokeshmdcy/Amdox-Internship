const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token, access denied'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
};

module.exports = { auth, isAdmin };
