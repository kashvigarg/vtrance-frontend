import React, { useEffect } from "react";
import DragDropComponent from "./ui/DragDrop";
import "../App.css";
import customToast from "./ui/custom-toast";
import Options from "./ui/Options";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  

  const goToProfile = () => {
    // customToast("Go to Profile!")
    navigate("/profile")
  }

  // TODO: Add selectFile and selectFormat Hooks in Parent

  return (
    <div className="app-container">
      <div className="dashboard-header">
        <button onClick={() => goToProfile()}>Profile</button>
        <div className="header-spacer" />
        <h1 className="sub-heading">V-Trance</h1>
        <button onClick={() => {}} className="logout-button">
          <img src="./icons/logout.png" alt="" className="logout-icon" />
          Logout
        </button>
      </div>
      <div className="dashboard-body">
      <DragDropComponent/>
      <Options/>
      </div>
      <div className="button-bar">
      <button>Transcode</button>
      <button>Transcode+Stream</button>
      </div>
    </div>
  );
};

export default Dashboard;
