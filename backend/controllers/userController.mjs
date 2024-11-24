import asyncHandler from "express-async-handler";
import User from "../models/userModel.mjs";
import generateToken from "../utils/generateToken.mjs";

// @desc    Auth user/set token
// route    POST /api/users/auth
// access   public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password')
  }
});

// @dsc     Register a new user
// route    POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data')
  }
});

// @dsc     Logout user
// route    POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)

  });
  res.status(200).json({ message: 'User logged Out' })
});

// @dsc     Get user profile
// route    GET /api/users/profile
// @access  Private (Private meaning you have to have a token to access this)
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  }

  res.status(200).json(user);
});

// @dsc     Update user profile
// route    PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    };

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });

  } else {
    res.status(404);
    throw new Error('User not found')
  }
  res.status(200).json({ message: 'Update User Profile' })
});

// @dsc     Get all users
// route    GET /api/users
// @access  Private
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const users = await User.find({})
    .select('-password')
    .skip(skip)
    .limit(limit);

  const totalUsers = await User.countDocuments();

  if (users.length > 0) {
    res.status(200).json({
      users,
      page,
      pages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } else {
    res.status(404);
    throw new Error('No users found');
  }
});