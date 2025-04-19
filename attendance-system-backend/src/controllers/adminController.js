// controllers/authController.js
const User = require("../models/userModel");
const Attendance = require("../models/attendanceModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const generateEmpId = require("../utils/generateEmpId");
const generatePassword = require("../utils/generatePassword");
const employeeWelcomeTemplate = require("../utils/emailTemplates");

// Admin Registration
exports.registerAdmin = async (req, res) => {
  const { name, empId, email, password } = req.body;

  try {
    const existingAdmin = await User.findOne({ empId, role: "admin" });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, msg: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      empId,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    res.status(201).json({
      success: true,
      msg: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        empId: admin.empId,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error in registerAdmin:", error.message);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { empId, password } = req.body;

  try {
    const admin = await User.findOne({ empId });

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Invalid admin credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // this is must
      sameSite: "None", // this is most likely the problem!
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: admin.name,
        empId: admin.empId,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Admin Logout
exports.logoutAdmin = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error });
  }
};

exports.registerEmployee = async (req, res) => {
  try {
    const { name, email } = req.body;

    const empId = generateEmpId();
    const plainPassword = generatePassword();

    // Check uniqueness of empId
    const existing = await User.findOne({ empId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Generated empId already exists. Try again." });
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newEmployee = new User({
      name,
      empId,
      password: hashedPassword,
      email,
      role: "employee",
    });

    await newEmployee.save();

    // ✅ Send email after successful registration
    const emailHTML = employeeWelcomeTemplate(name, empId, plainPassword);
    await sendEmail(
      email,
      "Welcome to the Company! Your Login Credentials",
      emailHTML
    );

    res.status(201).json({
      message:
        "Employee registered successfully and credentials sent via email",
      empId,
      password: plainPassword,
    });
  } catch (error) {
    console.error("Error in employee registration:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
exports.getEmployeeAttendance = async (req, res) => {
  try {
    const { empId } = req.params;
    console.log("Fetching attendance for empId:", empId);

    if (!empId) {
      return res.status(400).json({
        message: "Employee ID is required",
      });
    }

    const userExists = await User.findOne({ empId, role: "employee" });
    if (!userExists) {
      return res.status(404).json({
        message: "Employee not found or not registered",
      });
    }

    const attendanceRecords = await Attendance.find({ empId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Attendance fetched successfully",
      count: attendanceRecords.length,
      records: attendanceRecords,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching attendance",
      error: error.message,
    });
  }
};

// ✅ GET /api/admin/employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
};
