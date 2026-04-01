// server.js
const express = require("express");
const dotenv = require("dotenv");
const summarizeText = require("./example_GeminiAI.js");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
];

// CORS
const corsOptions = {
  origin: allowedOrigins,
  // credentials: true,
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// Middleware
app.use(express.json()); // replaces body-parser

// MongoDB Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// Routes
app.post("/api/summarize", async (req, res) => {
  const { text } = req.body;

  // AI call
  const summarizedText = await summarizeText(text);

  res.status(200).json({
    message: "successfully summarized",
    summary: summarizedText,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
