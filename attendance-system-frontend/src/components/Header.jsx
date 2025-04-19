import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/attendx.png";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b border-gray-200">
      {/* Logo on the left */}
      <Link to="/">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Attendance Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-semibold text-[#1D1D1D]">AttendX</span>
        </div>
      </Link>

      {/* Buttons on the right */}
      <div className="flex gap-3 ml-auto">
        <Link
          to="/api/employee/login-employee"
          className="px-4 py-2 rounded-xl bg-[#007AFF] text-white font-medium hover:bg-[#005FCC] transition duration-200 shadow-sm"
        >
          Employee Login
        </Link>

        <Link
          to="/api/auth/admin/login"
          className="px-4 py-2 rounded-xl bg-[#6C63FF] text-white font-medium hover:bg-[#574FE1] transition duration-200 shadow-sm"
        >
          Admin Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
