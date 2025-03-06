const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Device = mongoose.model("Device", DeviceSchema);
module.exports = Device;
