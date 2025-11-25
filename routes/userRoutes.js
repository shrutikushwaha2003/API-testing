const express = require("express");
const router = express.Router();

const {
  signup,
  verifyOtp,
  login,
  createUser,
  getUsers,
  getUserByName,
  updateUser,
  deleteUser,
  deleteAllUsers,
  forgotPassword,
  verifyForgotOtp,
  resetPassword
} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-otp", verifyForgotOtp);
router.post("/reset-password", resetPassword);


// Admin CRUD
router.post("/create", createUser);
router.get("/all", getUsers);
router.get("/:name", getUserByName);
router.put("/:name", updateUser);
router.delete("/:name", deleteUser);
router.delete("/", deleteAllUsers);

module.exports = router;
