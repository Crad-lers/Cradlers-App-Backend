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

// ✅ Get user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Change Password
router.put("/password", protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    user.password = newPassword; // Will be hashed in `pre("save")`
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update Preferences (Language, Theme, Notifications)
router.put("/preferences", protect, async (req, res) => {
  const { language, theme, notifications } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.language = language || user.language;
    user.theme = theme || user.theme;
    user.notifications = notifications !== undefined ? notifications : user.notifications;

    await user.save();

    res.json({ message: "Preferences updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get App Info
router.get("/app-info", (req, res) => {
  res.json({
    appVersion: "1.0.0",
    deviceInfo: "Flutter App - Cradlers v1",
  });
});

module.exports = router;
