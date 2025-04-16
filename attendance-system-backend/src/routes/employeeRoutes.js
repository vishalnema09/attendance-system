const express = require("express");
const router = express.Router();
const { loginEmployee,logoutEmployee,} = require("../controllers/employeeController");

// Employee Login
router.post("/login-employee", loginEmployee);
const { verifyToken}  = require("../middleware/authMiddleware"); 

// Employee Logout
router.get("/logout-employee",verifyToken, logoutEmployee);

module.exports = router;
