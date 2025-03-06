const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get user settings
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.settings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
