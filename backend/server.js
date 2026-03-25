// server.js
const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // replaces body-parser

// MongoDB Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
