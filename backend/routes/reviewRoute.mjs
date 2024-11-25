import express from 'express';
import { addReview, deleteReview } from '../controllers/reviewController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
const router = express.Router();

router.route('/').post(protect, authorizeRoles('buyer'), addReview);
// router.route('/:id').delete(protect, authorizeRoles('buyer'), deleteReview);
router.delete('/:id', protect, authorizeRoles('buyer'), deleteReview);

export default router;