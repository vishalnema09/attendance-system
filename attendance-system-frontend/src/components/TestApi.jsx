// src/components/TestApi.jsx
import React, { useEffect } from "react";
import Axios from "../utils/Axios";

const TestApi = () => {
  useEffect(() => {
    const testCall = async () => {
      try {
        const res = await Axios.get("/api/employee/test"); // Replace with your test route
        console.log("Response:", res.data);
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
      }
    };

    testCall();
  }, []);

  return <div>Check console for API response</div>;
};

export default TestApi;
