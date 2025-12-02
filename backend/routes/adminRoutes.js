import { Router } from 'express';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import User from '../models/usersModel.js';
import Club from '../models/Club.js';

const router = Router();

// All admin routes require admin auth
router.use(protect, requireAdmin);

// Get all users
router.get('/users', async (_req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all clubs
router.get('/clubs', async (_req, res) => {
  try {
    const clubs = await Club.find().select('-passwordHash');
    res.json({ success: true, count: clubs.length, data: clubs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

