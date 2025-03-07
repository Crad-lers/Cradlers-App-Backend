const mongoose = require("mongoose");

const HealthDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  heartRate: { type: Number, required: true },
  temperature: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const HealthData = mongoose.model("HealthData", HealthDataSchema);
module.exports = HealthData;
