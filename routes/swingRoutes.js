const express = require("express");
const SwingSettings = require("../models/SwingSettings");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get Current Swing Settings
router.get("/settings", protect, async (req, res) => {
  try {
    let settings = await SwingSettings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = new SwingSettings({ userId: req.user.id });
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Start Swinging
router.post("/start", protect, async (req, res) => {
  try {
    let settings = await SwingSettings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = new SwingSettings({ userId: req.user.id });
    }

    settings.swingMode = "ON";
    settings.updatedAt = Date.now();
    await settings.save();

    res.json({ message: "Cradle swinging started", settings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Stop Swinging
router.post("/stop", protect, async (req, res) => {
  try {
    let settings = await SwingSettings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = new SwingSettings({ userId: req.user.id });
    }

    settings.swingMode = "OFF";
    settings.updatedAt = Date.now();
    await settings.save();

    res.json({ message: "Cradle swinging stopped", settings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Set Swing Mode (Auto, ON, OFF)
router.post("/mode", protect, async (req, res) => {
  const { mode } = req.body;

  if (!["Auto", "ON", "OFF"].includes(mode)) {
    return res.status(400).json({ message: "Invalid swing mode" });
  }

  try {
    let settings = await SwingSettings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = new SwingSettings({ userId: req.user.id });
    }

    settings.swingMode = mode;
    settings.updatedAt = Date.now();
    await settings.save();

    res.json({ message: `Swing mode set to ${mode}`, settings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Enable or Disable Music While Swinging
router.post("/music", protect, async (req, res) => {
  const { musicEnabled } = req.body;

  try {
    let settings = await SwingSettings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = new SwingSettings({ userId: req.user.id });
    }

    settings.musicWhileSwinging = musicEnabled;
    settings.updatedAt = Date.now();
    await settings.save();

    res.json({ message: `Music while swinging set to ${musicEnabled}`, settings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
