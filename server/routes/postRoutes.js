const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { createPost, getFeed } = require("../controllers/postController");

router.post("/", protect, createPost);
router.get("/feed", protect, getFeed);

module.exports = router;
