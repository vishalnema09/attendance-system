// src/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    empId: {
      type: String,
      required: true,
      unique: true, // Make sure empId is unique
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "employee"], // You can define roles
      required: true,
    },
  },
  { timestamps: true } // This will add createdAt and updatedAt automatically
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
