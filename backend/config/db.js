import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv"; // for accessing some environment variables we need this
dotenv.config(); // call the dotenv with this line
import bcrypt from "bcryptjs";

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

// creates  a sql connection using our env variables
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);
// this sql function exported allows us to write sql queries safely
//  psql 'postgresql://neondb_owner:npg_jdZ5TUGWQP6M@ep-snowy-frost-agqcvmos-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

// ========================================
//  🔹 Initialize Database & Tables
// ========================================
export async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS user_details (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        profile_image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initDB", error);
  }
}
// *********************end******************

// ========================================
// 🔹  User Queries
// ========================================

// ➤ create new user
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

// ➤ Find User by ID
export async function findUserById(id) {
  const result = await sql`
    SELECT id, full_name, email, profile_image_url, created_at
    FROM user_details
    WHERE id = ${id};
  `;

  return result; // always return array
}

// ➤ Find user by email
export async function findUserByEmail(email) {
  const result = await sql`SELECT * FROM user_details WHERE email =(${email})`;
  return result[0]; // always return array
}

// ➤ Compare Passwords
// Compare password
export async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
