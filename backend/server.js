import dotenv from "dotenv"; // for accessing some environment variables we need this
dotenv.config(); // call the dotenv with this lineconst express = require("express");
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import { initDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { createIncomeTable } from "./models/income.db.js";

const __filename = fileURLToPath(import.meta.url); //Gets the absolute path of the current file
const __dirname = path.dirname(__filename); // Gets the directory the file is in
// __dirname is a global variable that holds the absolute path to the directory containing the currently executing script file.
// fileURLToPath ...converts that URL string into a standard file path string that the operating system understands,
//  which is then assigned to __filename
const app = express();

//Midleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
await createIncomeTable();
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
// serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// uploads: name of the subfolder in the backend you want to reach

const PORT = process.env.PORT || 5000;
initDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
