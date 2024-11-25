import express from 'express';
import { addProduct, getAllProducts, getSellerProducts, UpdateProduct } from '../controllers/productController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.route('/').post(protect, authorizeRoles('admin', 'seller'), addProduct).get(protect, authorizeRoles('admin'), getAllProducts);
router.get('/seller', protect, authorizeRoles('seller'), getSellerProducts);
router.put('/:id', protect, authorizeRoles('admin', 'seller'), UpdateProduct);

export default router;