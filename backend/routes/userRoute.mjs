import express from 'express';
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controllers/userController.mjs';
import { protect } from '../middleware/authMiddleware.mjs';
const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').put(protect,updateUserProfile).get(protect,getUserProfile);

export default router;