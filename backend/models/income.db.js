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
    // console.log("Income table is ready");
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
  return result[0]; //return the  inserted income row
}

// ========================================
// 🔹 get income details
// ========================================
export async function findIncomeDetails(userId) {
  // Query incomes for this user, sorted by date descending
  const result =
    await sql`SELECT * FROM income WHERE user_id = ${userId} ORDER BY date DESC `;
  return result;
}

// ========================================
// 🔹 Delete income details
// ========================================
export async function findUserByIdAndDeleteIncome(incomeId, userId) {
  const result = await sql` DELETE FROM income
    WHERE id = ${incomeId}  AND user_id = ${userId}
    RETURNING *`;
  return result[0];
}


// ========================================
// 🔹 function to add income
// ========================================
export async function getTotalIncome(userId) {
  const results = await sql `SELECT COALESCE(SUM(amount), 0) AS total_income
    FROM income
    WHERE user_id = ${userId}`

    return results[0].total_income
  
}

// ========================================
// 🔹 function to get income transactions in the last 60 days
// ========================================

export async function getLast60DaysIncome(userId) {
  const results = await sql`
    SELECT *
    FROM income
    WHERE user_id = ${userId}
      AND date >= NOW() - INTERVAL '60 days'
    ORDER BY date DESC;
  `;
  
  return results;
}

export async function getLast60DaysIncomeTotal(userId) {
   const result = await sql`
    SELECT COALESCE(SUM(amount), 0) AS total_last_60_days
    FROM income
    WHERE user_id = ${userId}
      AND date >= NOW() - INTERVAL '60 days';
  `;

  return result[0].total_last_60_days;
}