import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios"; // Custom Axios instance
import SummaryApi from "../common/SummaryApi"; // API route constants
import AxiosToastError from "../utils/AxiosToastError"; // Error handler

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(SummaryApi.adminRegister.url, formData);

      if (response?.data?.success) {
        toast.success("Admin registered successfully!");

        // Clear form data
        setFormData({
          empId: "",
          name: "",
          email: "",
          password: "",
        });

        // Delay the navigation to /admin/dashboard after the toast is shown
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000); // 2000ms = 2 seconds (you can adjust the duration as per your need)
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-indigo-200 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md border border-gray-300">
        <h2 className="text-4xl font-semibold text-center text-indigo-600 mb-6">
          Admin Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Employee ID
            </label>
            <input
              type="text"
              name="empId"
              value={formData.empId}
              onChange={handleChange}
              placeholder="e.g., EMP123"
              required
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Full Name"
              required
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., admin@example.com"
              required
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-300"
          >
            Register Admin
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
