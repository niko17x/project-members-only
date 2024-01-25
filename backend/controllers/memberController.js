import asyncHandler from "express-async-handler";
import { Member } from "../models/memberModels.js";

export const getAnswer = asyncHandler(async (req, res) => {
  // req.user provides current authenticated user
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const userAnswer = req.body.answer;
    const isCorrect = userAnswer === process.env.MEMBER_ANSWER;
    const memberStatus = await Member.create({
      answer: isCorrect,
    });

    if (isCorrect) {
      return res.status(201).json({ answer: isCorrect });
    } else {
      return res.status(400).json({ message: "Incorrect answer" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
1;
