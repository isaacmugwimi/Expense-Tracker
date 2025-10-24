import jwt from "jsonwebtoken";
import { sql } from "../config/db.js"; 

export const protect = async (request, response, next) => {
  let token = request.headers.authorization?.split(" ")[1];
  if (!token)
    return response.status(401).json({ message: "Not authorized, no token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await sql`
      SELECT id, full_name, email, profile_image_url, created_at, updated_at
      FROM user_details
      WHERE id = ${decoded.id}
      LIMIT 1;
    `;
    const user = result[0];
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    request.user = user;
    next();
  } catch (error) {
    response.status(401).json({ message: "Not authorized, token failed!" });
  }
};
