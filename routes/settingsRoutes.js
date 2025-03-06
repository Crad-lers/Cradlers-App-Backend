const express = require("express");
const bcrypt = require("bcryptjs");
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
// ✅ Update Profile
router.put("/profile", protect, async (req, res) => {
    const { name, email } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.name = name || user.name;
      user.email = email || user.email;
      await user.save();
  
      res.json({ message: "Profile updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
    
  });

module.exports = router;
