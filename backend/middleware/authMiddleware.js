import jwt from "jsonwebtoken";
import { findUserById, sql } from "../config/db.js";

export const protect = async (request, response, next) => {
  let token = request.headers.authorization?.split(" ")[1]; //extracting the token from the header
  if (!token)
    return response.status(401).json({ message: "Not authorized, no token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifying the token
    

    const result = await findUserById(decoded.id);
    const user = result[0]; // returning the very first user found as per the id in the token
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    request.user = user;   // attach user data to the request object
    next();  // continue to the next handler (like getUserInfo)
  } catch (error) {
    response.status(401).json({ message: "Not authorized, token failed!" });
  }
};
