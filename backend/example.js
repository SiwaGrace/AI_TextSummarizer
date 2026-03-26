// example.cjs
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Check if API key exists
if (!process.env.GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY not found in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateStory() {
  try {
    // Use the free model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = "Write a one-sentence bedtime story about a unicorn.";

    console.log("Generating story...");
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("\n📖 Story:", text);
  } catch (error) {
    console.error("❌ Error:", error.message);

    if (error.message.includes("API_KEY_INVALID")) {
      console.error(
        "\n💡 Tip: Check your .env file. Make sure GEMINI_API_KEY is correct.",
      );
    }
  }
}

// Run it
generateStory();
