const express = require("express");
const Device = require("../models/Device");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get all devices for a user
router.get("/", protect, async (req, res) => {
  try {
    const devices = await Device.find({ userId: req.user.id });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add a new device
router.post("/", protect, async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: "Name and type are required" });
  }

  try {
    const newDevice = new Device({ name, type,connectionType, userId: req.user.id });
    await newDevice.save();
    res.status(201).json({message: "Device added successfully", device: newDevice});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
