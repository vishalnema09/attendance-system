const User = require("../models/userModel"); // User Model import
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Middleware for token verification

exports.registerAdmin = async (req, res) => {
  const { name, empId, password } = req.body;

  // Check if admin already exists
  const existingAdmin = await User.findOne({ empId, role: "admin" });

  if (existingAdmin) {
    return res.status(400).json({ msg: "Admin already exists" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new Admin
    const admin = new User({
      name,
      empId,
      password: hashedPassword,
      role: "admin", // Mark as admin
    });

    // Save the admin to the database
    await admin.save();

    // Respond with success message
    res.json({ msg: "Admin registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.loginAdmin = async (req, res) => {
  const { empId, password } = req.body;

  try {
    // Step 1: Find user by empId
    const admin = await User.findOne({ empId });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Step 2: Check if the user is an admin
    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    // Step 3: Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step 4: Generate token
    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: admin.name,
        empId: admin.empId,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.logoutAdmin = async (req, res) => {
  try {
    // Clear the cookie where token is stored
    res.clearCookie("token");

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
      error,
    });
  }
};

// controllers/employeeController.js

exports.registerEmployee = async (req, res) => {
  const { name, empId, password } = req.body;

  console.log(name, empId, password); // Debugging line
  if (!name || !empId || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingEmployee = await User.findOne({ empId });

    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = new User({
      name,
      empId,
      password: hashedPassword,
      role: "employee",
    });

    await employee.save();

    res.status(201).json({ message: "Employee registered successfully", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
