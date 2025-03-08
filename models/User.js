const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  phone: { type: String },
  language: { type: String, default: "English" },
  theme: { type: String, default: "light" },
  notifications: { type: Boolean, default: true },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Check if the password is already hashed
  if (this.password.startsWith("$2b$")) {
    console.log("Password is already hashed:", this.password);
    return next();
  }

  console.log("Original Password:", this.password); // Log the original password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("Hashed Password:", this.password); // Log the hashed password
  next();
});

// Compare password method
UserSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Entered Password:", enteredPassword); // Log the entered password
  console.log("Stored Hashed Password:", this.password); // Log the stored hashed password
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  console.log("Password Match Result:", isMatch); // Log the comparison result
  return isMatch;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;