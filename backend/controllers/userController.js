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
      admin: user.admin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, adminCode, memberCode, memberSince } =
    req.body;
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
    memberSince,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      member: user.member,
      memberSince: user.memberSince,
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

// Get authenticated user data
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    admin: req.user.admin,
    member: req.user.member,
    memberSince: req.user.memberSince,
  };

  res.status(200).json(user);
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.member =
      user.member === true || req.body.member === process.env.MEMBER_CODE
        ? true
        : false;
    user.memberSince = new Date();

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      member: updatedUser.member,
      memberSince: updatedUser.memberSince,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const updateSelectedProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.member = req.body.member;
    console.log("user.member", user.member);
    console.log("req.body.member", req.body.member);
    user.memberSince = req.body.memberDate || user.memberSince;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      member: updatedUser.member,
      memberSince: updatedUser.memberSince,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const getSelectedProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    member: user.member,
    memberSince: user.memberSince,
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authorized" });
  }

  const users = await User.find({});

  res.status(201).json(users);
});

export const deleteUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const user = await User.findById(req.params.userId);

    await User.deleteOne({ _id: req.params.userId });

    res.status(204).json({ message: `${user} has been deleted` });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});
