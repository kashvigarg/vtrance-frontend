import React, { useEffect } from "react";
import DragDropComponent from "./ui/DragDrop";
import "../App.css";
import customToast from "./ui/custom-toast";
import CustomHeader from "./ui/custom-header";
import Options from "./ui/Options";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    // customToast("Go to Profile!")
    navigate("/profile");
  };

  // TODO: Add selectFile and selectFormat Hooks in Parent

  return (
    <div className="app-container">
      <CustomHeader/>
      <div className="dashboard-body">
        <DragDropComponent />
        <Options />
      </div>
    </div>
  );
};

export default Dashboard;
