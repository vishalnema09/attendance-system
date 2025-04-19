import React from "react";
import TestApi from "./components/TestApi";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
