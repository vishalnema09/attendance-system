const User = require("../models/userModel"); // User Model import
const Attendance = require("../models/attendanceModel"); //
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

exports.loginEmployee = async (req, res) => {
  const { empId, password } = req.body;

  try {
    // Step 1: Check employee exist
    const employee = await User.findOne({ empId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Step 2: Check role
    if (employee.role !== "employee") {
      return res.status(403).json({ message: "Not authorized as employee" });
    }

    // Step 3: Compare password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step 4: Generate token
    const token = jwt.sign(
      { userId: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Step 5: Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only secure in prod
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: employee.name,
        empId: employee.empId,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.logoutEmployee = async (req, res) => {
  try {
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

exports.markAttendance = async (req, res) => {
  try {
    const { empId, location } = req.body;
    const file = req.file;
    console.log(empId, location, file);

    if (!empId || !location || !file) {
      return res.status(400).json({
        message:
          "Please provide all required fields (empId, location, and photo)",
      });
    }

    // Check if employee exists
    const employee = await User.findOne({ empId });

    console.log("Employee Found:", employee);
    if (!employee) {
      return res.status(404).json({ message: "Employee ID not found." });
    }

    // Check if the user has the correct role
    if (employee.role !== "employee") {
      return res.status(403).json({
        message: "Access Denied. Only employees can mark attendance.",
      });
    }

    // Check if attendance already marked today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize time

    const alreadyMarked = await Attendance.findOne({ empId, date: today });
    if (alreadyMarked) {
      return res
        .status(400)
        .json({ message: "Attendance already marked today." });
    }

    // Upload image to Cloudinary using stream
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "GoBite" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const uploadResult = await streamUpload(file.buffer);

    // Save attendance
    const attendance = new Attendance({
      user: employee._id,
      empId,
      name: employee.name,
      location,
      photo: uploadResult.secure_url,
      date: today,
    });

    await attendance.save();

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      message: "Something went wrong while marking attendance.",
      error: error.message,
    });
  }
};
