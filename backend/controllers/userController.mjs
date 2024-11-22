import asyncHandler from "express-async-handler";
import User from "../models/userModel.mjs";
import generateToken from "../utils/generateToken.mjs";


// @desc    Auth user/set token
// route    POST /api/users/auth
// access   public
export const authUser = (req, res) => {
  res.status(200).json({ message: 'User Logged in' })
}

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

  // res.status(200).json({ message: 'Register User' })
});

// @dsc     Logout user
// route    POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logout User' })
});

// @dsc     Get user profile
// route    GET /api/users/profile
// @access  Private (Private meaning you have to have a token to access this)
export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get User Profile' })
});

// @dsc     Update user profile
// route    PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Update User Profile' })
});

