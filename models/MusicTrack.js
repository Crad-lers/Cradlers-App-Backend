const mongoose = require("mongoose");

const MusicTrackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }, // URL to audio file
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

const MusicTrack = mongoose.model("MusicTrack", MusicTrackSchema);
module.exports = MusicTrack;
