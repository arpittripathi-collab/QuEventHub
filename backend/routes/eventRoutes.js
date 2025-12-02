// import express from 'express';
// import { getEvents, registerForEvent } from '../controllers/eventController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/', protect, getEvents);

// router.post('/register', protect, registerForEvent);
// router.get('/myevents', protect, getMyEvents);

// export default router;


import express from 'express';
import { getMyEvents } from '../controllers/eventController.js';
// 👈 You must add getMyEvents to this line 
import { getEvents, registerForEvent} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ... (rest of your routes)

router.get('/myevents', protect, getMyEvents); // <-- Now defined!

export default router;