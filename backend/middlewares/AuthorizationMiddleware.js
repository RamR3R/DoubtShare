const User = require('../models/user.model');

const authorizationMiddleware = async (req, res, next) => {
  const allowedUserTypes = { // Define allowed user types for specific routes
    '/api/tutors/ping': ['tutor'],
    '/api/doubtRequests': ['student', 'tutor'],
  };

  const requiredUserType = allowedUserTypes[req.url];

  if (!requiredUserType) {
    return next(); // No authorization needed for this route
  }

  const user = await User.findByPk(req.userId); // Fetch user data

  if (!user || !requiredUserType.includes(user.userType)) {
    return res.status(403).json({ message: 'Forbidden' }); // Unauthorized access
  }

  next();
};

module.exports = authorizationMiddleware;
