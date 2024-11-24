import express from 'express';
import { authUser, getAllUsers, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controllers/userController.mjs';
import { admin, protect } from '../middleware/authMiddleware.mjs';
const router = express.Router();

router.get('/', protect, admin, getAllUsers);
router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;