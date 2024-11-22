import express from 'express';
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controllers/userController.mjs';
const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').put(updateUserProfile).get(getUserProfile);

export default router;