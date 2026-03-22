const mongoose = require("mongoose");

const embeddingSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },

    content: String,

    embedding: [Number],

    country: String,
    university: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Embedding", embeddingSchema);
