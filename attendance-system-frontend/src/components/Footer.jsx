import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F8F9FB] text-[#1D1D1D] py-6 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Project Description */}
        <div className="max-w-md">
          <h2 className="text-lg font-semibold mb-2">
            Attendance Management System
          </h2>
          <p className="text-sm text-gray-600">
            A simple yet powerful solution for managing employee attendance.
            Employees can mark their presence with location, time, and photo –
            and admins can track it all with ease.
          </p>
        </div>

        {/* Navigation Button */}
        <div>
          <a
            href="/register"
            className="px-4 py-2 bg-[#007AFF] hover:bg-[#005FCC] text-white rounded-xl text-sm font-medium transition duration-200 shadow-sm"
          >
            Register As Admin
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Attendance Management System. Built
        with 💙 using the MERN stack.
      </div>
    </footer>
  );
};

export default Footer;
