import asyncHandler from "express-async-handler";
import Message from "../models/messageModels.js";

export const getMessage = asyncHandler(async (req, res) => {
  if (req.user) {
    if (req.user.member) {
      // Authenticated members get access to messages & user data
      // `populate` method is used to reference another collection specifically
      const detailedMessage = await Message.find({});
      res.status(200).json(detailedMessage);
    } else {
      const message = await Message.find({}).select("-userId -username");
      res.status(200).json(message);
    }
  }
});

export const getPublicAccess = asyncHandler(async (req, res) => {
  const messages = await Message.find({}).select("-userId -username");
  res.status(200).json(messages);
});

export const createMessage = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter message");
  }

  // req.user.id is set by the 'protect' middleware
  const message = await Message.create({
    text: req.body.text,
    userId: req.user._id, // Use the authenticated user's ID
    username: req.user.name,
  });

  res.status(200).json(message);
});

export const deleteMessage = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404).json({ message: "You are not authorized" });
  }

  try {
    const messageToDelete = await Message.findById(req.params.id);

    if (!messageToDelete) {
      return res.status(401).json({ message: "Message not found" });
    }

    await Message.deleteOne({ _id: req.params.id });

    res.status(204).json({ message: "Message deleted" });
  } catch (error) {
    console.error("Error in deleteMessage:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
