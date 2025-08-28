const bcrypt = require("bcryptjs");
const Login = require("../Model/loginModel");
const generateToken = require("../jwt");

// 🔑 User/Admin Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Generate token with role
    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      message: "Login Successful",
      token,
      role: user.role, // 👈 return role so frontend knows where to redirect
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 🔑 User Register
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await Login.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new Login({
      username,
      email,
      password: passwordHash,
      role: "user", // 👈 default role
    });

    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// 🔑 Admin Register (restricted route)
const createAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const admin = await Login.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = new Login({
      username,
      email,
      password: passwordHash,
      role: "admin", // 👈 explicitly set as admin
    });

    await newAdmin.save();
    return res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

module.exports = { login, createUser, createAdmin };
