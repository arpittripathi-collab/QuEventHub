import express from 'express';
import { getEvents, registerForEvent } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getEvents);

router.post('/register', protect, registerForEvent);
router.get('/myevents', protect, getMyEvents);

export default router;
