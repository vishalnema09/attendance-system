const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage(); // This stores file in memory (in buffer)
const upload = multer({ storage: storage }); // This is the middleware you'll use
const {
  loginEmployee,
  logoutEmployee,
  markAttendance,
} = require("../controllers/employeeController");

// Employee Login
router.post("/login-employee", loginEmployee);
const { verifyToken, isEmployee } = require("../middleware/authMiddleware");

// Employee Logout
router.get("/logout-employee", verifyToken, logoutEmployee);
router.post(
  "/mark",
  verifyToken,
  isEmployee,
  upload.single("photo"),
  markAttendance
);

module.exports = router;
