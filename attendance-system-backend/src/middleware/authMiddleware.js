// /middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized, token missing in cookies" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin access required" });
  }
};

const isEmployee = (req, res, next) => {
  if (req.user && req.user.role === "employee") {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied. Employees only." });
  }
};

module.exports = { verifyToken, isAdmin, isEmployee };
