import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import { addExpenseRecord } from "../models/expense.db.js";
import { findExpenseDetails } from "../models/expense.db.js";
import { findUserByIdAndDeleteExpense } from "../models/expense.db.js";

// ========================================
// 🔹 Add Expense
// ========================================
export const addExpense = async (request, response) => {
  const user_id = request.user.id;
  try {
    const { icon, category, amount, date } = request.body;
    // validation: Check for missing fields
    if (!category || !amount || !date) {
      return response.status(400).json({ message: "All fields are required!" });
    }

    // insert into DB
    const newExpense = await addExpenseRecord(
      user_id,
      icon,
      category,
      amount,
      date
    );

    response
      .status(200)
      .json({ message: "Expense added Successfully", expense: newExpense });
  } catch (error) {
    console.error("Server Error", error);
    response.status(500).json({ message: "Server error" });
  }
};

// ========================================
// 🔹 Get All Expense
// ========================================
export const getAllExpense = async (request, response) => {
  // Get the user ID
  const userId = request.user.id;
  try {
    const expense = await findExpenseDetails(userId);
    response.json(expense);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "server error!" });
  }
};

// ========================================
// 🔹 Delete Expense
// ========================================
export const deleteExpense = async (request, response) => {
  const userId = request.user.id;
  const expenseId = Number(request.params.id);

  try {
    const deleted = await findUserByIdAndDeleteExpense(expenseId, userId);
    if (!deleted) {
      return response
        .status(404)
        .json({ message: "Expense not found or unauthorized" });
    }
    response
      .status(200)
      .json({ message: "Expense Deleted Successfully", deleted });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Server Error while trying to delete" });
    console.error(error);
  }
};

// ========================================
// 🔹 Download Expense Excel
// ========================================
export const downloadExpenseExcel = async (request, response) => {
  const userId = request.user.id;
  try {
    const expense = await findExpenseDetails(userId);
    // Check if user has any expense records
    if (!expense || expense.length === 0) {
      return response
        .status(404)
        .json({ message: "No expense records found for this user" });
    }
    // Prepare data for excel
    const data = expense.map((item) => {
      // instantiate date object
      const dateObj = new Date(item.date);

      // Format date as dd/mm/yyyy
      const formattedDate = dateObj
        .toLocaleDateString("en-GB",{timeZone:"Africa/Nairobi"})
        .replace(/\//g, "/");
      // en-GB gives dd/mm/yyyy format

      // Format time as hour/minute/second (24-hour format)
      const formattedTime = dateObj
        .toLocaleTimeString("en-GB", {
          timeZone:"Africa/Nairobi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false, // 24-hour format
        })
        .replace(/:/g, "/");
      return {
        category: item.category,
        Amount: item.amount,
        Date: formattedDate,
        Time: formattedTime,
      };
    });

    // ✅ Create workbook and worksheet correctly
    //  wb - workbook
    // ws - work sheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    // ✅ Create export folder if it doesn’t exist
    const exportedDir = path.join(process.cwd(), "excel_exports");
    const exportDir = path.join(exportedDir, "expense_excel_exports");
    // path.join() is used to combine multiple folder and file names into a single valid file path
    // cwd is the current working directory
    // process.cwd() is the base directory
    if (!fs.existsSync(exportDir)) {
      // fs - file system module
      // It allows you to read, write, create, delete, or check files and folders.
      fs.mkdirSync(exportDir);
      // mkdirSync() = “Make Directory Synchronously”.
      // It creates a new folder at the given path.
    }

    // ✅ Generate unique filename inside the "excel_exports"
    const fileName = `expense_details_${userId}_${Date.now()}.xlsx`;
    const filePath = path.join(exportDir, fileName);

    // Write File
    xlsx.writeFile(wb, filePath);

    // ✅ Send file as download
    response.download(filePath, (error) => {
      if (error) console.error("Error sending file: ", error);
    });

    // Done
  } catch (error) {
    console.error("Error trying to create excel file: ", error);
    response
      .status(500)
      .json({ message: "Server Error while trying to prepare excel file!" });
  }
};
