const { generateEmbedding, generateAnswer } = require("../services/aiService");
const { findRelevantPosts } = require("../services/vectorSearch");
const User = require("../models/User");

exports.askAI = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const question = req.body.question;

    const queryEmbedding = await generateEmbedding(question);

    const relevantPosts = await findRelevantPosts(queryEmbedding, user);

    const answer = await generateAnswer(question, relevantPosts);

    res.json({
      answer,
      sources: relevantPosts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
