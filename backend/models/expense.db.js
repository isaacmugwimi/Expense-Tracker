import { sql } from "../config/db.js";

export async function createExpenseTable() {
  try {
    await sql`
  CREATE TABLE IF NOT EXISTS expense (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES user_details(id) ON DELETE CASCADE,
    icon TEXT,
    category VARCHAR(100) NOT NULL, 
    amount NUMERIC(10, 2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
    console.log("Expense table is ready");
  } catch (error) {
    console.error("Error in creating expense table: ", error);
  }
}

// ========================================
// 🔹 insert new expense row
// ========================================

export async function addExpenseRecord(user_id, icon, category, amount, date) {
  const result = await sql`
    INSERT INTO expense(user_id, icon, category,amount, date) values(${user_id}, ${icon}, ${category},${amount}, ${date}) RETURNING *
    `;
  return result[0]; //return the  inserted Expense row
}

// ========================================
// 🔹 get Expense details
// ========================================
export async function findExpenseDetails(userId) {
  // Query Expenses for this user, sorted by date descending
  const result =
    await sql`SELECT * FROM expense WHERE user_id = ${userId} ORDER BY date DESC `;
  return result;
}

// ========================================
// 🔹 Delete expense details
// ========================================
export async function findUserByIdAndDeleteExpense(expenseId, userId) {
  const result = await sql` DELETE FROM expense
    WHERE id = ${expenseId}  AND user_id = ${userId}
    RETURNING *`;
  return result[0];
}
// ========================================
// 🔹 function to add expense
// ========================================
export async function getTotalExpense(userId) {
  const results = await sql `SELECT COALESCE(SUM(amount), 0) AS total_expense
    FROM expense
    WHERE user_id = ${userId}`

    return results[0].total_expense
  
}

// ========================================
// 🔹 function to get expense transactions in the last 60 days
// ========================================

export async function getLast30DaysExpense(userId) {
  const results = await sql`
    SELECT *
    FROM expense
    WHERE user_id = ${userId}
      AND date >= NOW() - INTERVAL '30 days'
    ORDER BY date DESC;
  `;
  
  return results;
}

export async function getLast30DaysExpenseTotal(userId) {
   const result = await sql`
    SELECT COALESCE(SUM(amount), 0) AS total_last_30_days
    FROM expense
    WHERE user_id = ${userId}
      AND date >= NOW() - INTERVAL '30 days';
  `;

  return result[0].total_last_30_days;
}