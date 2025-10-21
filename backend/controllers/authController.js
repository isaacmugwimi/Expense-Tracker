const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (request, response) => {
  const { fullName, email, password, profileImageUrl } = request.body;

  // ******************** validation ********************
  // Checking for missing fields
  if (!fullName || !email || !password) {
    return response.status(400).json({ message: "All fields are required." });
  }
  try {
    // checking if email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(400).json({ message: "Email alreaduy in use" });
    }

    // create the new user
    const newUser = await User.create({
      fullName,
      password,
      email,
      profileImageUrl,
    });

    response.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
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

// Login User
exports.loginUser = async (request, response) => {};

// Get User
exports.getUserInfo = async (request, response) => {};
