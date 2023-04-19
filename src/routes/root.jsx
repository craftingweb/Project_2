import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const root = () => {
  return (
    <div className="grid grid-rows-6 min-h-screen">
      <div className="row-span-1">
        <Navbar />
      </div>
      <div className="row-span-5 w-10/12 my-4 mx-auto">
        <Outlet />
      </div>
      <div className="row-span-1">
        <Footer />
      </div>
    </div>
  );
};

export default root;
