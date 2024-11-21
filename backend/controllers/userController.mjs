import asyncHandler from "express-async-handler";

// @desc    Auth user/set token
// route    POST /api/user/auth
// access   public
export const authUser = (req, res) => {
  res.status(200).json({ message: 'User Logged in' })
}

// @dsc     Register a new user
// route    POST /api/user
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Register User' })
});

// @dsc     Logout user
// route    POST /api/user/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logout User' })
});

// @dsc     Get user profile
// route    GET /api/user/profile
// @access  Private (Private meaning you have to have a token to access this)
export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get User Profile' })
});

// @dsc     Update user profile
// route    PUT /api/user/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Update User Profile' })
});

