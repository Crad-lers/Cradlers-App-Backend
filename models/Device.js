const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  connectionType: { type: String, enum: ["Bluetooth", "WiFi"], required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bodyTemperature: { type: Number, default: 36 },
  oxygenLevel: { type: Number, default: 20 },
  cradleSwingSpeed: { type: Number, default: 3 },
}, { timestamps: true });

const Device = mongoose.model("Device", DeviceSchema);
module.exports = Device;
