const Comment = require("../models/Comment");

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      postId: req.body.postId,
      userId: req.user.id,
      content: req.body.content,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Comments for Post
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
    }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
