const Embedding = require("../models/Embedding");

// cosine similarity
const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return dot / (magA * magB);
};

const findRelevantPosts = async (queryEmbedding, user) => {
  const embeddings = await Embedding.find({
    country: user.profile.country,
    university: user.profile.university,
  });

  const scored = embeddings.map((item) => ({
    ...item.toObject(),
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};

module.exports = { findRelevantPosts };
