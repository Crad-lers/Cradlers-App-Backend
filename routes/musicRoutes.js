const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Fetch available tracks
router.get("/tracks", protect, async (req, res) => {
    try {
      const tracks = await MusicTrack.find({ userId: req.user.id });
      res.json(tracks);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
// ✅ Play Music
router.post("/play", protect, (req, res) => {
  const { song } = req.body;
  if (!song) return res.status(400).json({ message: "Song name is required" });

  res.json({ message: `Playing ${song}` });
});

// ✅ Stop Music
router.post("/stop", protect, (req, res) => {
  res.json({ message: "Music stopped" });
});

module.exports = router;
