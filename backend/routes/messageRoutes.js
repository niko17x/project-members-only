import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessage,
  getPublicAccess,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getMessage).post(protect, createMessage);

// Actual route: localhost:5000/api/messages/public-access => defined in server.js
router.route("/public-access").get(getPublicAccess);

router.route("/:id").delete(protect, deleteMessage);

export { router as messageRouter };
