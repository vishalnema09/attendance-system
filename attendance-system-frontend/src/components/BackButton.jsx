import React from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Previous page par le jaata hai
    navigate(-1);
    // alternatively: window.history.back();
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      <BiArrowBack size={20} />
      <span className="font-medium">Go Back</span>
    </button>
  );
};

export default BackButton;
