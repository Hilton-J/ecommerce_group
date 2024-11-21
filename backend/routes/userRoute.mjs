import express from 'express';
import { authUser } from '../controllers/userController.mjs';
const router = express.Router();

router.post('/login', authUser);

export default router;