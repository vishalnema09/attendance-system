import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    empId: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.empId || !formData.password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    try {
      const response = await Axios.post(SummaryApi.adminLogin.url, formData);

      if (response?.data?.token) {
        toast.success("Login successful!");
        setErrorMessage("");

        localStorage.setItem("token", response.data.token);

        setFormData({ empId: "", password: "" });

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Employee ID
            </label>
            <input
              type="text"
              name="empId"
              value={formData.empId}
              onChange={handleChange}
              placeholder="e.g., EMP123"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-600 hover:text-blue-700"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
