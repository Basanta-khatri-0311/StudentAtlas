const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    profile: {
      country: String,
      city: String,
      university: String,
      intake: String,
      budget: Number,
      skills: [String],
      status: String,
    },

    profileScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
