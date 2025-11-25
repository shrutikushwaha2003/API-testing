// 1. IMPORT SERVICES
const {
  registerService,
  verifyOtpService,
  loginService,
  createUserService,
  getUsersService,
  getUserByNameService,
  updateUserService,
  deleteUserService,
  deleteAllUsersService,
  forgotPasswordService,
  verifyForgotOtpService,
  resetPasswordService
} = require("../services/userService");


// 2. USER AUTHENTICATION CONTROLLERS

// 2.1 SIGNUP
exports.signup = async (req, res) => {
  try {
    const result = await registerService(req.body);
    if (result.error) return res.status(400).json({ message: result.error });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 2.2 VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const result = await verifyOtpService(req.body);
    if (result.error) return res.status(400).json({ message: result.error });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 2.3 LOGIN
exports.login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    if (result.error) return res.status(400).json({ message: result.error });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// 3. FORGOT PASSWORD FLOW

// 3.1 FORGOT PASSWORD (SEND OTP)
exports.forgotPassword = async (req, res) => {
  try {
    const result = await forgotPasswordService(req.body);
    if (result.error) return res.status(400).json({ message: result.error });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 3.2 VERIFY FORGOT PASSWORD OTP
exports.verifyForgotOtp = async (req, res) => {
  try {
    const result = await verifyForgotOtpService(req.body);
    if (result.error) return res.status(400).json({ message: result.error });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 3.3 RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const result = await resetPasswordService(req.body);
    if (result.error) return res.status(400).json({ message: result.error });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// 4. ADMIN CRUD OPERATIONS

// 4.1 CREATE USER
exports.createUser = async (req, res) => {
  try {
    const result = await createUserService(req.body);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 4.2 GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const result = await getUsersService();
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 4.3 GET USER BY NAME
exports.getUserByName = async (req, res) => {
  try {
    const result = await getUserByNameService(req.params.name);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 4.4 UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const result = await updateUserService(req.params.name, req.body);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 4.5 DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const result = await deleteUserService(req.params.name);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 4.6 DELETE ALL USERS
exports.deleteAllUsers = async (req, res) => {
  try {
    const result = await deleteAllUsersService();
    res.json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
