import express from "express";
export const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getSelectedProfile,
  updateSelectedProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

// base URL: "/api/users"

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/all-users").get(protect, getAllUsers);
router.route("/:userId").delete(protect, deleteUser);
router.route("/selected-profile/:userId").get(protect, getSelectedProfile);
router.route("/profile/:userId").put(protect, getUserProfile);
router.route("/selected-profile/:userId").put(protect, updateSelectedProfile);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
