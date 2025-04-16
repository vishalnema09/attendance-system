const express = require("express");
const router = express.Router();

// Import both register and login controllers
const { registerAdmin, loginAdmin ,logoutAdmin, registerEmployee} = require("../controllers/adminController");
const { verifyToken}  = require("../middleware/authMiddleware"); 

// ✅ Admin Register Route
router.post("/admin/register", registerAdmin);

// ✅ Admin Login Route
router.post("/admin/login", loginAdmin);

router.get("/admin/logout", verifyToken, logoutAdmin); // 👈 Add this route

router.post("/admin/register-employee", verifyToken, registerEmployee);


module.exports = router;