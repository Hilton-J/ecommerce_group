import express from 'express';
import { addReview, deleteReview, getReviews, updateReview } from '../controllers/reviewController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
const router = express.Router();

router.route('/').post(protect, authorizeRoles('buyer'), addReview).get(getReviews);
router.route('/:id').delete(protect, authorizeRoles('buyer'), deleteReview).put(protect, authorizeRoles('buyer'), updateReview);
// router.route.delete('/:id', protect, authorizeRoles('buyer'), deleteReview);

export default router;