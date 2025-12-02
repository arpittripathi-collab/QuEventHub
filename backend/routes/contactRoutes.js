import { Router } from 'express';
import { sendContactEmail } from '../controllers/contactController.js';

const router = Router();

// Contact form submission route
router.post('/', sendContactEmail);

export default router;
