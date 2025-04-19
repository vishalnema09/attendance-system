// src/utils/Axios.js
import axios from "axios";

// Token fetcher (assuming it's stored in localStorage after login)
const getToken = () => {
  return localStorage.getItem("token");
};

const Axios = axios.create({
  baseURL: "https://attendance-system-backend-9z8d.onrender.com", // ✅ Updated base URL
  withCredentials: true, // ✅ Updated base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to every request
Axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle global errors
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized access - maybe invalid token?");
      // Optional: handle logout or redirect
    }
    return Promise.reject(error);
  }
);

export default Axios;
