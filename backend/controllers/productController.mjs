import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.mjs';

// @dsc     Add new Product
// route    POST /api/products
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
    seller: req.user._id,
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
        seller: product.seller
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid product data')
  }
});

// @dsc     Update Product
// route    PUT /api/products/:id
// @access  Private
export const UpdateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (product) {
    const updateProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: {
        _id: updateProduct._id,
        name: updateProduct.name,
        description: updateProduct.description,
        price: updateProduct.price,
        stock: updateProduct.stock,
        category: updateProduct.category,
        image: updateProduct.image,
        seller: updateProduct.seller
      },
    });
  } else {
    res.status(400);
    throw new Error('Product not found')
  }
});

// @dsc     Get all products
// route    GET /api/products
// @access  Private
export const getAllProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const products = await Product.find({})
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments();

  if (products.length > 0) {
    res.status(200).json({
      products,
      page,
      pages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } else {
    res.status(404);
    throw new Error('No products found');
  }
});

// @dsc     Get seller products
// route    GET /api/products/seller
// @access  Private
export const getSellerProducts = asyncHandler(async (req, res) => {
  const { seller } = req.body;
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const products = await Product.find({ seller }).skip(skip).limit(limit);

  const totalProducts = await Product.countDocuments({ seller });

  if (products.length > 0) {
    res.status(200).json({
      products,
      page,
      pages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } else {
    res.status(404);
    throw new Error('No products found');
  }
});

// @dsc     Delete Product
// route    DEL /api/products
// @access  Private
export const deleteProduct = asyncHandler(async (req, res) => {
  const seller = String(req.user._id);
  const { id } = req.params;
  const product = await Product.findOneAndDelete({ _id: id, seller });

  if (product) {
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});