require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Summarizes text using the Gemini 2.5 Flash model found in your discovery.
 * Includes exponential backoff for production-grade reliability.
 */
async function summarizeText(text, retries = 5, delay = 1000) {
  // Select the model ID exactly as shown in your discovery output
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Please provide a concise summary of the following text:\n\n${text}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    // Handle rate limits or temporary server errors with exponential backoff
    if (retries > 0 && (error.status === 429 || error.status >= 500)) {
      console.log(
        `⚠️ Request failed. Retrying in ${delay}ms... (${retries} retries left)`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return summarizeText(text, retries - 1, delay * 2);
    }

    console.error("❌ Gemini Error:", error.message);
    throw error;
  }
}

module.exports = summarizeText;
// Example Usage
// const sampleText =
//   "Artificial intelligence is transforming the way we process information...";

// summarizeText(sampleText)
//   .then((summary) => console.log("\n--- Summary ---\n", summary))
//   .catch((err) => console.error("Final Failure:", err));
