const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // referring to User model
      required: true,
    },
    empId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "Not Provided",
    },
    photo: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: () => new Date().setHours(0, 0, 0, 0), // set only the date (without time)
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
