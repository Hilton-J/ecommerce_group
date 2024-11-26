import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.mjs';


export const addCategory = asyncHandler(async (req, res) => {
  const { name, description, parentCategory } = req.body;

  const category = new Category({
    name,
    description,
    parentCategory,
  });
  const savedCategory = await category.save();

  if (parentCategory) {
    const parent = await Category.findById(parentCategory);
    if (parent) {
      parent.subcategories.push(savedCategory._id);
      await parent.save();
    }
  }

  res.status(201).json(savedCategory);
});


export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().populate('subcategories');
  res.status(200).json(categories);
});


export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).populate('subcategories');
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.status(200).json(category);
});


export const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, parentCategory } = req.body;
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    { name, description, parentCategory },
    { new: true }
  );

  if (!updatedCategory) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.status(200).json(updatedCategory);
});


export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }


  if (category.parentCategory) {
    const parentCategory = await Category.findById(category.parentCategory);
    if (parentCategory) {
      parentCategory.subcategories = parentCategory.subcategories.filter(
        (subcategoryId) => !subcategoryId.equals(category._id)
      );
      await parentCategory.save();
    }
  }

  res.status(200).json({ message: 'Category deleted successfully' });
});

    
      
    

