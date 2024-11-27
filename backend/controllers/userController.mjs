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

    
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

// @desc     Register a new user
// route    POST /api/users
// @access   Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, companyName, companyRegistration, address } = req.body;

  
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

 
  if (role === 'seller' && (!companyName || !companyRegistration || !address)) {
    res.status(400);
    throw new Error('Please provide all required seller fields.');
  }


  const user = await User.create({
    name,
    email,
    password,
    role,
    companyName,
    companyRegistration,
    address
  });

  if (user) {

    generateToken(res, user._id);

   
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        companyRegistration: user.companyRegistration,
        address: user.address
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc     Logout user
// route    POST /api/users/logout
// @access   Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0) // Set cookie expiration to the past to clear the token
  });

  res.status(200).json({ success: true, message: 'User logged out' });
});

// @desc     Get user profile
// route    GET /api/users/profile
// @access   Private (Requires valid JWT token)
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  };

  res.status(200).json({ success: true, data: user });
});

// @desc     Update user profile
// route    PUT /api/users/profile
// @access   Private (Requires valid JWT token)
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      }
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc     Get all users
// route    GET /api/users
// @access   Private (Admin access required)
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const users = await User.find({}).select('-password').skip(skip).limit(limit);

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

// @desc     Delete user
// route    DELETE /api/users/:id
// @access   Private (Admin access required)
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (user) {
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {
        _id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
