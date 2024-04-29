require("dotenv").config()
const jwt = require('jsonwebtoken');
const KEY=process.env.KEY


// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  // Extract token from headers
  const token = req.headers['token'];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, KEY);

    // Attach user information to request object
    req.user = decoded; // Change to req.user

    // Call next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
