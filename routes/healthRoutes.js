const express = require("express");
const HealthData = require("../models/HealthData");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Fetch latest health data
router.get("/", protect, async (req, res) => {
  try {
    const healthData = await HealthData.findOne({ userId: req.user.id }).sort({ timestamp: -1 });
    if (!healthData) return res.status(404).json({ message: "No health data found" });

    res.json(healthData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
