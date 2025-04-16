const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();
app.use(cookieParser()); // Middleware to parse cookies
// Middleware to handle JSON requests
app.use(express.json());

// Connect to the database
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    // Define routes after DB connection
    app.use("/api/auth", authRoutes);

    // Start the server once DB is connected
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit if DB connection fails
  });

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
