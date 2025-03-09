const express = require("express");
const DeviceSettings = require("../models/DeviceSettings");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get current device settings
router.get("/", protect, async (req, res) => {
  try {
    let settings = await DeviceSettings.findOne({ userId: req.user.id });

    if (!settings) {
      // Default if not set
      settings = new DeviceSettings({ userId: req.user.id });
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
  // ✅ Update device settings
router.put("/", protect, async (req, res) => {
    const { bodyTemperature, oxygenLevel, cradleSwingSpeed } = req.body;
  
    try {
      let settings = await DeviceSettings.findOne({ userId: req.user.id });
  
      if (!settings) {
        settings = new DeviceSettings({ userId: req.user.id });
      }
  
      settings.bodyTemperature = bodyTemperature ?? settings.bodyTemperature;
      settings.oxygenLevel = oxygenLevel ?? settings.oxygenLevel;
      settings.cradleSwingSpeed = cradleSwingSpeed ?? settings.cradleSwingSpeed;
      settings.updatedAt = Date.now();
  
      await settings.save();
  
      res.json({ message: "Settings updated successfully", settings });
    } catch (error) {
      res.status(500).json({ message: "Failed to update settings" });
    }
  });
  
  module.exports = router;
});