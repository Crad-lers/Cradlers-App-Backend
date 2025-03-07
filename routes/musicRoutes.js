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

router.post("/add", protect, async (req, res) => {
    const { name, url } = req.body;
  
    if (!name || !url) {
      return res.status(400).json({ message: "Track name and URL are required" });
    }
  
    try {
      const newTrack = new MusicTrack({ name, url, userId: req.user.id });
      await newTrack.save();
  
      res.status(201).json({ message: "Track added successfully", track: newTrack });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
