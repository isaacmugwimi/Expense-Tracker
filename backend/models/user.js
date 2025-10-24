import bcrypt from "bcryptjs";
import { sql } from "../config/db.js"; // from your Neon/PostgreSQL connection

// create new user
export async function createUser(
  fullName,
  email,
  password,
  profileImageUrl = null
) {
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await sql`
    INSERT INTO user_details (full_name, email, password, profile_image_url)
    VALUES (${fullName}, ${email}, ${hashedPassword}, ${profileImageUrl})
    RETURNING id, full_name, email, profile_image_url, created_at;
  `;
  return result[0]; // Return the created user
}

// Find user by email
export async function findUserByEmail(email) {
  // console.log('Looking for email: ', email)
  const result = await sql`SELECT * FROM user_details WHERE email =(${email})`;
  // console.log("Results: ", result);
  return result[0];
}

// Compare password
export async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
