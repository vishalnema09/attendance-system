import React from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios"; // 👈 use your configured Axios instance
import toast from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await Axios.get("/api/auth/admin/logout", {
        withCredentials: true, // 👈 Important if you're using cookies
      });

      if (res.status === 200) {
        // Optional: Clear any frontend token
        localStorage.removeItem("token");
        toast.success(res.data.message || "Logged out successfully");
        navigate("/");
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong while logging out.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
