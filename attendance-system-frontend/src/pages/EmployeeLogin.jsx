import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios"; // Assuming you're using Axios
import SummaryApi from "../common/SummaryApi"; // Replace with your actual path
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const EmployeeLogin = () => {
  const [formData, setFormData] = useState({
    empId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Reset error message when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { empId, password } = formData;

    // Basic validation to ensure fields are filled
    if (!empId || !password) {
      setError("Please fill all the required fields.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await Axios.post(SummaryApi.loginEmployee.url, formData);

      if (response?.data?.token) {
        setError("");
        toast.success("Login Successful!");
        setTimeout(() => {
          navigate("/api/employee/mark");
        }, 1000); // Wait for 1 second before navigating
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
      AxiosToastError(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#155DFC] mb-6">
          Employee Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Employee ID
            </label>
            <input
              type="text"
              name="empId"
              value={formData.empId}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC]"
              placeholder="Enter your Employee ID"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155DFC]"
              placeholder="Enter your Password"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm font-medium text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#155DFC] text-white py-2 rounded-lg hover:bg-[#2015fc] transition duration-300"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
