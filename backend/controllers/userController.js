import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";
import { User } from "../models/userModels.js";
import dotenv from "dotenv";
dotenv.config();

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, adminCode, memberCode } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const isAdmin = adminCode === process.env.ADMIN_CODE;
  const isMember = memberCode === process.env.MEMBER_CODE;

  const user = await User.create({
    name,
    email,
    password,
    admin: isAdmin,
    member: isMember,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      member: user.member,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  // Destroy active cookies when user signs out
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Immediately expire
  });

  res.status(200).json({ message: "User logged out" });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    console.log(user);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.member =
      user.member === true || req.body.member === process.env.MEMBER_CODE
        ? true
        : false;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      member: updatedUser.member,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
