const express = require("express");
const router = express.Router();
const { loginEmployee,logoutEmployee, markAttendance } = require("../controllers/employeeController");

// Employee Login
router.post("/login-employee", loginEmployee);
const { verifyToken}  = require("../middleware/authMiddleware"); 

// Employee Logout
router.get("/logout-employee",verifyToken, logoutEmployee);
router.post('/mark', markAttendance);


module.exports = router;
