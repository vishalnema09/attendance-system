import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-center bg-[#F9FAFB] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1D] mb-4">
          Smart Employee Attendance System
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A modern, secure and efficient way to manage employee attendance.
          Track location, mark time with a photo, and ensure compliance with
          real-time data monitoring — all in one system.
        </p>

        {/* Core Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-[#007AFF] font-semibold text-lg mb-2">
              📍 Geo-location Tracking
            </h3>
            <p className="text-gray-600 text-sm">
              Know exactly where the attendance was marked using live GPS
              integration.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-[#007AFF] font-semibold text-lg mb-2">
              🕒 Time-stamped Entries
            </h3>
            <p className="text-gray-600 text-sm">
              Ensure punctuality with automatic time capture during
              punch-in/out.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-[#007AFF] font-semibold text-lg mb-2">
              📸 Photo Verification
            </h3>
            <p className="text-gray-600 text-sm">
              Add an extra layer of authenticity with instant photo capture.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
