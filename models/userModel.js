const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  otp: { type: String, default: null },            // Signup OTP
  isVerified: { type: Boolean, default: false },   // After signup verify

  forgotOtp: { type: String, default: null },      // Forgot password OTP
  canResetPassword: { type: Boolean, default: false } // Reset allowed flag
});

module.exports = mongoose.model("User", userSchema);
