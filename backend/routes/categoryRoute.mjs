import express from 'express';
import { addCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();


router.route('/').post(protect, authorizeRoles('admin', 'seller'), addCategory).get(protect, authorizeRoles('admin'), getAllCategories);


router.route('/:id').get(protect, authorizeRoles('admin', 'seller'), getCategoryById);


router.put('/:id', protect, authorizeRoles('admin', 'seller'), updateCategory);


router.delete('/:id', protect, authorizeRoles('admin'), deleteCategory);

export default router;

