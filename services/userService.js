const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/email");

// -------------------- GENERATE OTP --------------------
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// -------------------- SIGNUP --------------------
exports.registerService = async ({ name, email, password }) => {
  const exist = await User.findOne({ email });
  if (exist) return { error: "User already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOtp();

  // Send OTP Email
  await sendEmail(email, "Your Signup OTP", `Your OTP is: ${otp}`);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    otp,
    isVerified: false
  });

  return { message: "Signup successful. OTP sent to email", user };
};

// -------------------- VERIFY OTP --------------------
exports.verifyOtpService = async ({ email, otp }) => {
  const user = await User.findOne({ email });
  if (!user) return { error: "User not found" };
  if (user.otp !== otp) return { error: "Invalid OTP" };

  user.isVerified = true;
  user.otp = null;
  await user.save();

  return { message: "OTP Verified Successfully" };
};

// -------------------- LOGIN --------------------
exports.loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return { error: "User not found" };
  if (!user.isVerified) return { error: "Please verify OTP first" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: "Wrong password" };

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  return { message: "Login Successful", token };
};

// -------------------- FORGOT PASSWORD --------------------
exports.forgotPasswordService = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) return { error: "User not found" };

  const forgotOtp = generateOtp();

  user.forgotOtp = forgotOtp;
  await user.save();

  // Send Forgot Password OTP Email
  await sendEmail(email, "Your Password Reset OTP", `Your OTP is: ${forgotOtp}`);

  return {
    message: "OTP sent to email for password reset"
  };
};

// -------------------- VERIFY FORGOT OTP --------------------
exports.verifyForgotOtpService = async ({ email, otp }) => {
  const user = await User.findOne({ email });
  if (!user) return { error: "User not found" };

  if (user.forgotOtp !== otp) return { error: "Invalid OTP" };

  user.forgotOtp = null;
  user.canResetPassword = true;
  await user.save();

  return { message: "OTP verified. You can reset your password now." };
};

// -------------------- RESET PASSWORD --------------------
exports.resetPasswordService = async ({ email, newPassword }) => {
  const user = await User.findOne({ email });
  if (!user) return { error: "User not found" };

  if (!user.canResetPassword)
    return { error: "OTP not verified. Cannot reset password." };

  user.password = await bcrypt.hash(newPassword, 10);
  user.canResetPassword = false;

  await user.save();

  return { message: "Password reset successfully" };
};

// -------------------- CRUD SERVICES --------------------
exports.createUserService = async (data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return await User.create(data);
};

exports.getUsersService = async () => await User.find();

exports.getUserByNameService = async (name) =>
  await User.findOne({ name });

exports.updateUserService = async (name, body) =>
  await User.findOneAndUpdate({ name }, body, { new: true });

exports.deleteUserService = async (name) =>
  await User.findOneAndDelete({ name });

exports.deleteAllUsersService = async () => await User.deleteMany({});
