import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, return error
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Not authorized, no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'User not found' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid token' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ success: false, message: 'Token expired' });
    }

    return res
      .status(401)
      .json({ success: false, message: 'Not authorized, token failed' });
  }
};

export { protect };
