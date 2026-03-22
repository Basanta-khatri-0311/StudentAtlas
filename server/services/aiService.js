const OpenAI = require("openai");

// Initialize OpenAI conditionally
let openai = null;
if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes("your_key")) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Generate embedding
const generateEmbedding = async (text) => {
  if (!openai) {
    console.warn("⚠️ OpenAI API Key missing. Returning mock embedding.");
    // Return a random 1536-dimension vector for testing
    return new Array(1536).fill(0).map(() => Math.random());
  }

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
};

// Generate AI answer from context
const generateAnswer = async (question, contextPosts) => {
  if (!openai) {
    return "🚀 StudentAtlas AI: Everything is working correctly! We found relevant community posts, but I can't generate a natural language answer yet because the OpenAI API Key is missing in your .env file.";
  }

  const context = contextPosts.map((p) => p.content).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4.5-preview", // or "gpt-4o-mini"
    messages: [
      {
        role: "system",
        content: "You are an assistant helping students relocate abroad using real community experiences.",
      },
      {
        role: "user",
        content: `Question: ${question}\n\nBased on these community insights:\n${context}`,
      },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = { generateEmbedding, generateAnswer };
