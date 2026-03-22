const OpenAI = require("openai");

const isMock = process.env.AI_MODE === "mock";

let openai;
if (!isMock) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Mock embedding
const mockEmbedding = () => {
  return Array(1536).fill(0).map(() => Math.random());
};

// Generate embedding
const generateEmbedding = async (text) => {
  if (isMock) {
    return mockEmbedding();
  }

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
};

// Mock answer
const mockAnswer = (question, contextPosts) => {
  return `Mock AI Answer:
Based on ${contextPosts.length} community posts,
students say: housing is expensive but manageable with sharing.`;
};

// Generate answer
const generateAnswer = async (question, contextPosts) => {
  if (isMock) {
    return mockAnswer(question, contextPosts);
  }

  const context = contextPosts.map((p) => p.content).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant helping students relocate abroad using real community experiences.",
      },
      {
        role: "user",
        content: `
        Question: ${question}
        Context:
        ${context}
        `,
      },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = { generateEmbedding, generateAnswer };
