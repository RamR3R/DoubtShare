const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' }); // Missing token
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.userId = decoded.userId; // Attach user ID to request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' }); // Invalid or expired token
  }
};

module.exports = authMiddleware;
