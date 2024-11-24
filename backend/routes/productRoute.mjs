import express from 'express';
import { addProduct } from '../controllers/productController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post('/', protect, authorizeRoles('admin'), addProduct);

export default router;