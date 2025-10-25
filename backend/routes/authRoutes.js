import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getUserInfo,
  imageUpload,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/register", registerUser); // working
router.post("/login", loginUser); // working
router.get("/getUser", protect, getUserInfo); // working
router.post("/upload-image", imageUpload); // working
export default router;
