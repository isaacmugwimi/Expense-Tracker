import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  comparePassword,
} from "../models/user.js";
import { request, response } from "express";
import upload from "../middleware/uploadMiddleware.js";
import { findUserById, sql } from "../config/db.js";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ========================================
// 🔹 Register User
// ========================================
export const registerUser = async (request, response) => {
  const { fullName, email, password, profileImageUrl } = request.body;

  // ******************** validation ********************
  // Checking for missing fields
  if (!fullName || !email || !password) {
    return response.status(400).json({ message: "All fields are required." });
  }
  try {
    // checking if email already exists in the database
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return response.status(400).json({ message: "Email already in use" });
    }

    // create the new user
    const newUser = await createUser(
      fullName,
      email,
      password,
      profileImageUrl
    );

    response.status(201).json({
      id: newUser.id,
      newUser,
      token: generateToken(newUser.id),
    });

    //
    // catch goes here
    //
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// ========================================
// 🔹 Login User
// ========================================
export const loginUser = async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400).json({ message: "All fields are required!" });
  }
  try {
    const existingUser = await findUserByEmail(email);

    // checking if user exists
    if (!existingUser) {
      return response.status(400).json({ message: "That user doesn't exists" });
    }

    const isMatch = await comparePassword(password, existingUser.password);
    if (!isMatch) {
      return response.status(400).json({ message: "Invalid password!" });
    }

    response.status(200).json({
      message: "Loging successful!",
      id: existingUser.id,
      existingUser,
      token: generateToken(existingUser.id),
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "Error login in user", error: error.message });
  }
};

// ========================================
// 🔹 Get User Info
// ========================================
export const getUserInfo = async (request, response) => {
  try {
    // Get the user ID (should come from decoded JWT or session)
    const user = await findUserById(request.user.id);

    // if no users found
    if (!user) {
      return response.status(400).json({ message: "User not found!" });
    }

    response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({
      message: "Server error in getting user details!",
      error: error.message,
    });
  }
};

// ========================================
// 🔹 Handle Image Upload
// ========================================
export const imageUpload = async (request, response) => {
  upload.single("image")(request, response, (error) => {
    if (error) {
      // If anything goes wrong during the upload (wrong file type, file too large, etc.), it stops here and sends back an error.
      return response
        .status(400)
        .json({ message: "error from image upload: " + error.message });
    }
    if (!request.file) {
      // This checks that a file was actually sent from the frontend.
      return response.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${request.protocol}://${request.get("host")}/uploads/${
      request.file.filename
    }`;
    response.status(200).json({ imageUrl });
  });
};
