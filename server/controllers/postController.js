const Post = require("../models/Post");
const User = require("../models/User");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const post = await Post.create({
      userId: user._id,
      content: req.body.content,
      tags: req.body.tags,
      country: user.profile.country,
      university: user.profile.university,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Feed
exports.getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const posts = await Post.find({
      country: user.profile.country,
      university: user.profile.university,
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like / Unlike Post
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post.likes) post.likes = []; // Initializing array if it's missing!

    const userId = req.user.id;
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
