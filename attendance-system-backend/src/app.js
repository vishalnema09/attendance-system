const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const connectDB = require("./config/database");
const authRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // replace with your frontend URL
  credentials: true // allow cookies to be sent cross-origin
}));

app.use(cookieParser());
app.use(express.json());

// Connect to the database
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    app.use("/api/auth", authRoutes);
    app.use("/api/employee", employeeRoutes);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit if DB connection fails
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
