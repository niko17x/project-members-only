import asyncHandler from "express-async-handler";
import { Member } from "../models/memberModels.js";
import { User } from "../models/userModels.js"; // Import the User model

export const getAnswer = asyncHandler(async (req, res) => {
  // req.user provides current authenticated user
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const userAnswer = req.body.answer;
    const isCorrect =
      userAnswer.trim().toLowerCase() === process.env.MEMBER_ANSWER;

    if (isCorrect) {
      user.memberSince = new Date();
      await user.save();

      return res
        .status(201)
        .json({ answer: isCorrect, message: "Correct answer" });
    } else {
      return res
        .status(200)
        .json({ answer: isCorrect, message: "Incorrect answer" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
