const User = require("../models/userModel"); // User Model import
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
        message: "Logout successful"
      });
    } catch (error) {
      res.status(500).json({
        message: "Logout failed",
        error
      });
    }
  };