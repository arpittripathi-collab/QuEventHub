import express from 'express';
import {
  createClub,
  deleteClub,
  getClubById,
  getClubs,
  joinClub,
  updateClub,
} from '../controllers/clubController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getClubs).post(protect, requireAdmin, createClub);

router
  .route('/:id')
  .get(getClubById)
  .put(protect, requireAdmin, updateClub)
  .delete(protect, requireAdmin, deleteClub);

router.post('/:id/join', protect, joinClub);

export default router;
