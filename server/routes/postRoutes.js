const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { createPost, getFeed, toggleLike } = require("../controllers/postController");

router.post("/", protect, createPost);
router.get("/feed", protect, getFeed);
router.put("/like/:postId", protect, toggleLike);


module.exports = router;
