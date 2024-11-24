import asyncHandler from "express-async-handler";
import Product from '../models/productModel.mjs'

// @dsc     Add new Product
// route    POST /api/products, accessable to 
// @access  Private
export const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category, image } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    category,
    image,
  });

  if (product) {
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        image: product.image,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid product data')
  }
});