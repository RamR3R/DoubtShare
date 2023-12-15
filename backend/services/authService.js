// authService.js
const jwt = require('jsonwebtoken');

const AuthService = {};

AuthService.generateToken = (userId) => {
  // Generate JWT token logic here
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

AuthService.verifyToken = (token) => {
  // Verify JWT token logic here
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    // Token verification failed
    return null;
  }
};

module.exports = AuthService;
