// =============================
// 🔹 Create Income Table
// =============================

import { sql } from "../config/db.js";

export async function createIncomeTable() {
  try {
    await sql`
  CREATE TABLE IF NOT EXISTS income (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES user_details(id) ON DELETE CASCADE,
    icon TEXT,
    source VARCHAR(100) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
    console.log("Income table is ready");
  } catch (error) {
    console.error("Error in creating income table: ", error);
  }
}

// ========================================
// 🔹 insert new income row
// ========================================

export async function addIncomeRecord(user_id, icon, source, amount, date) {
  const result = await sql`
    INSERT INTO income(user_id, icon, source,amount, date) values(${user_id}, ${icon}, ${source},${amount}, ${date}) RETURNING *
    `;
    return result[0] //return the  inserted income row
    
}
