// Import Gemini
import { GoogleGenerativeAI } from "@google/generative-ai";

// Your API key (from .env)
const API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY);

// Choose a model (gemini-2.0-flash-exp is free and fast)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
