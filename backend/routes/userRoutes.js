import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { updateUserProfile } from '../controllers/authController.js';

const router = Router();

// Get current user profile
router.get('/me', protect, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile', protect, updateUserProfile);

export default router;
