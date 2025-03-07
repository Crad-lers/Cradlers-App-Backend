const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Start Swing
router.post("/start", protect, (req, res) => {
  res.json({ message: "Cradle swinging started" });
});

// ✅ Stop Swing
router.post("/stop", protect, (req, res) => {
  res.json({ message: "Cradle swinging stopped" });
});

module.exports = router;
