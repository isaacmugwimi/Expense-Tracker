import {
  getLast30DaysExpense,
  getLast30DaysExpenseTotal,
  getTotalExpense,
} from "../models/expense.db.js";
import {
  getLast60DaysIncome,
  getLast60DaysIncomeTotal,
  getTotalIncome,
} from "../models/income.db.js";
import { getLast5transactions } from "../models/transactions.db.js";

// Dashboard data
export const getDashboardData = async (request, response) => {
  try {
    const user_id = request.user.id;
    console.log("User ID in Dashboard: ", user_id);
    // fetch total income for this user
    // 🔹 Calculate total income for this user
    const totalIncome = await getTotalIncome(user_id);
    console.log("Total Income: ", totalIncome);

    // fetch total expenses for this user
    // 🔹 Calculate total expenses for this user
    const totalExpense = await getTotalExpense(user_id);
    console.log("Total Expense: ", totalExpense);

    // Get Income Transaction in the last 60 days
    const getLast60DaysIncomeTransaction = await getLast60DaysIncome(user_id);
    console.log("Total Income Last 60 Days: ", getLast60DaysIncomeTransaction);

    // Get Income total in the last 60 days
    const last60DaysIncomeTotal = await getLast60DaysIncomeTotal(user_id);
    console.log("Total Income Last 60 Days: ", last60DaysIncomeTotal);

    // Get Expense Transaction in the last 60 days
    const getLast30DaysExpenseTransaction = await getLast30DaysExpense(user_id);
    console.log(
      "Total Expense Last 30 Days: ",
      getLast30DaysExpenseTransaction
    );

    // Get Expense total in the last 60 days
    const last30DaysExpenseTotal = await getLast30DaysExpenseTotal(user_id);
    console.log("Total Expense Last 30 Days: ", last30DaysExpenseTotal);

    // Get Expense total in the last 60 days
    const getLast5DaysExpenseTotal = await getLast5transactions(user_id);
    console.log("Total Expense Last 5 Days: ", getLast5DaysExpenseTotal);

    // 🔹 Send the data to the frontend
    return response.status(200).json({
      success: true,
      totalBalance: totalIncome - totalExpense,
      totalIncome: totalIncome,
      totalExpenses: totalExpense,
      last30DaysExpenses: {
        total: last30DaysExpenseTotal,
        transactions: getLast30DaysExpenseTransaction,
      },
      last60DaysIncome: {
        total: last60DaysIncomeTotal,
        transactions: getLast60DaysIncomeTransaction,
      },
      recentTransactions: getLast5DaysExpenseTotal,
    });
  } catch (error) {
    console.error("Server error: ", error);
    return response
      .status(500)
      .json({ success: false, message: "Server Error!" });
  }
};
