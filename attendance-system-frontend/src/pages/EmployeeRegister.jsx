import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";

const EmployeeRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [generatedCredentials, setGeneratedCredentials] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Start loading

    try {
      const response = await Axios.post(
        SummaryApi.registerEmployee.url,
        formData
      );

      if (response?.data?.empId && response?.data?.password) {
        toast.success("Employee registered successfully!");

        setGeneratedCredentials({
          empId: response.data.empId,
          password: response.data.password,
        });

        setFormData({ name: "", email: "" });

        // Optional navigation after 3 seconds
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 3000);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Register Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Full Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., email@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Registering..." : "Register Employee"}
          </button>
        </form>

        {generatedCredentials && (
          <div className="mt-6 bg-green-50 border border-green-400 rounded-lg p-4 text-green-700 text-sm">
            <p>
              <strong>empId:</strong> {generatedCredentials.empId}
            </p>
            <p>
              <strong>Temporary Password:</strong>{" "}
              {generatedCredentials.password}
            </p>
            <p className="text-xs mt-1">Credentials also sent to email.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeRegister;
