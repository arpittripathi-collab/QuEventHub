import { Router } from 'express';
import { register,login,verifyUser,resendOtp,resetPassword,forgotPassword} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verifyUser);
router.post('/resend', resendOtp);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);
// router.put('/profile', protect, updateUserProfile);

export default router;