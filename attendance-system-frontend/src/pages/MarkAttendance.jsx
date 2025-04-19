import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

const MarkAttendance = () => {
  const [empId, setEmpId] = useState("");
  const [location, setLocation] = useState("");
  const [locationLoading, setLocationLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  // 📍 Get location using Geolocation API
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setLocation(data.display_name || `${latitude}, ${longitude}`);
          } catch (err) {
            setLocation(`${latitude}, ${longitude}`);
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Location not available");
          setLocationLoading(false);
        }
      );
    } else {
      setLocation("Geolocation not supported");
      setLocationLoading(false);
    }
  }, []);

  // 📸 Capture image from webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  // 🚀 Submit Attendance (with backend sync)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empId || !location || !imageSrc) {
      alert("Please fill Employee ID, allow location & capture a photo.");
      return;
    }

    try {
      const blob = await fetch(imageSrc).then((res) => res.blob());
      const file = new File([blob], "attendance.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("empId", empId); // backend expects empId
      formData.append("location", location); // backend expects location
      formData.append("photo", file); // backend expects req.file

      const response = await Axios.post(
        SummaryApi.markAttendance.url,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response?.status === 201) {
        const { message, attendance } = response.data;
        alert(
          `✅ ${message}\n\nName: ${attendance.name}\nDate: ${new Date(
            attendance.date
          ).toDateString()}`
        );

        // Clear state
        setEmpId("");
        setImageSrc(null);
      }
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong.";

      if (status === 400 || status === 404) {
        alert(`❌ ${message}`);
      } else {
        alert(`🚨 Server Error: ${message}`);
      }

      console.error("Attendance Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="absolute top-28 left-5">
        <BackButton />
      </div>

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Mark Attendance
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Employee ID
            </label>
            <input
              type="text"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            {locationLoading ? (
              <p className="text-gray-500">Fetching location...</p>
            ) : (
              <input
                type="text"
                value={location}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg"
              />
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Capture Photo
            </label>
            {imageSrc ? (
              <div className="space-y-2">
                <img
                  src={imageSrc}
                  alt="Captured"
                  className="w-full rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => setImageSrc(null)}
                  className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Retake Photo
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full rounded-lg border"
                />
                <button
                  type="button"
                  onClick={capture}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Capture Photo
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarkAttendance;
