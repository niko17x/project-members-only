import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAnswer } from "../controllers/memberController.js";

const router = express.Router();

router.route("/").post(protect, getAnswer);

export { router as memberRouter };
