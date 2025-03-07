const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Fetch camera stream URL
router.get("/", protect, (req, res) => {
  res.json({ streamUrl: "http://your-camera-ip/stream" });
});

module.exports = router;
