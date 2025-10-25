// ========================================
// 🔹 Add Income

import { addIncomeRecord } from "../models/income.db.js";

// ========================================
export const addIncome = async (request, response) => {
  const user_id = request.user.id;
  try {
    const { icon, source, amount, date } = request.body;
    // validation: Check for missing fields
    if (!source || !amount || !date) {
      return response.status(400).json({ message: "All fields are required!" });
    }

    // insert into DB
    const newIncome = await addIncomeRecord(
      user_id,
      icon,
      source,
      amount,
      date
    );

    response
      .status(200)
      .json({ message: "Income added Successfully", income: newIncome });
  } catch (error) {
    console.error("Server Error", error);
    response.status(500).json({ message: "Server error" });
  }
};

// ========================================
// 🔹 Get All Income
// ========================================
export const getAllIncome = async (request, response) => {};

// ========================================
// 🔹 Download imcome Excel
// ========================================
export const downloadIncomeExcel = async (request, response) => {};

// ========================================
// 🔹 Delete Income
// ========================================
export const deleteIncome = async (request, response) => {};
