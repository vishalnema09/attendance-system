import React, { useEffect, useState } from "react";
import { FaUserPlus, FaCalendarCheck, FaHome, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import Logout from "../components/Logout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const admin = {
    name: "",
    empId: "",
    email: "",
  };

  // 🧠 Fetch employees when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await Axios.get(SummaryApi.getAllEmployees.url);
        if (response?.data?.success) {
          setEmployees(response.data.employees);
        }
      } catch (error) {
        AxiosToastError(error);
      }
    };

    fetchEmployees();
  }, []);

  const handleCheckAttendance = (empId) => {
    // Navigate to the attendance page for the clicked employee using empId
    navigate(`/api/auth/admin/attendance/${empId}`); // EmpId passed here
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-lg p-6 border-r border-gray-200">
        <h1 className="text-3xl font-semibold text-indigo-700 mb-12">
          Admin Panel
        </h1>
        <ul className="space-y-6">
          <li>
            <button
              className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 text-lg"
              onClick={() => navigate("/admin/dashboard")}
            >
              <FaHome size={20} /> Dashboard
            </button>
          </li>
          <li>
            <button
              className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 text-lg"
              onClick={() => navigate("/api/auth/admin/register-employee")}
            >
              <FaUserPlus size={20} /> Register Employee
            </button>
          </li>
          <li className="mt-auto">
            <Logout />
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        {/* Admin Info */}
        <div className="mb-10 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-4xl font-bold text-indigo-800 mb-3">
            Welcome to the Admin Dashboard!
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            As an admin, you have the authority to manage and oversee all
            employee attendance records.
          </p>
          <p className="text-lg text-gray-500">
            Here, you can view and filter attendance data for all employees,
            ensuring smooth operations and accurate records.
          </p>
        </div>

        {/* Employee Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {employees.map((emp) => (
            <div
              key={emp.empId}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="flex items-center gap-4 mb-5">
                <FaRegUser size={50} className="text-indigo-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {emp.name}
                  </h3>
                  <p className="text-sm text-gray-500">ID: {emp.empId}</p>
                  <p className="text-sm text-gray-400">{emp.email}</p>
                </div>
              </div>

              {/* Check Attendance Button */}
              <div className="text-right">
                <button
                  onClick={() => handleCheckAttendance(emp.empId)} // Pass empId here
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                  Check Attendance
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* If no employees */}
        {employees.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No employees found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
