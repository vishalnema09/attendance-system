import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // <-- apne backend ka baseURL
  withCredentials: true, // cookies send karega
});

export default axiosInstance;