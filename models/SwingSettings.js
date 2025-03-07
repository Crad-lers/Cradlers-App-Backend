const mongoose = require("mongoose");

const SwingSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  swingMode: { type: String, enum: ["Auto", "ON", "OFF"], default: "Auto" },
  musicWhileSwinging: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

const SwingSettings = mongoose.model("SwingSettings", SwingSettingsSchema);
module.exports = SwingSettings;
