const User = require("../models/User");
const calculateProfileScore = require("../utils/profileScore");
const getAccessLevel = require("../utils/accessControl");

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = req.body;
    const score = calculateProfileScore(profile);
    const accessLevel = getAccessLevel(score);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profile,
        profileScore: score,
      },
      { new: true }
    );

    res.json({
      user: updatedUser,
      profileScore: score,
      accessLevel,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

