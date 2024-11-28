import express from 'express';
import { addProduct, deleteProduct, getAllProducts, getSellerProducts, UpdateProduct } from '../controllers/productController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.route('/').post( addProduct).get( getAllProducts);
router.get('/seller', getSellerProducts);
router.route('/:id').put(protect, authorizeRoles('admin', 'seller'), UpdateProduct).delete(protect, deleteProduct);

export default router;