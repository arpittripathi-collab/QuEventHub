// import express from 'express';
// import { getEvents, registerForEvent } from '../controllers/eventController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/', protect, getEvents);

// router.post('/register', protect, registerForEvent);
// router.get('/myevents', protect, getMyEvents);

// export default router;


import express from 'express';
import { getEvents, registerForEvent, getMyEvents } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import Event from '../models/Event.js';

const router = express.Router();

// Get all events (public route, no auth required)
router.get('/', getEvents);

// Get single event by ID (public route)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Register for event (protected route)
router.post('/register', protect, registerForEvent);

// Get user's registered events (protected route)
router.get('/myevents', protect, getMyEvents);

export default router;