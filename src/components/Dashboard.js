import React, { useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";
import DragDropComponent from "./ui/DragDrop";
import "../App.css";
import customToast from "./ui/custom-toast";
import Options from "./ui/Options";

const Dashboard = () => {
  const auth = useAuth();

  // TODO: Add selectFile and selectFormat Hooks in Parent

  return (
    <div className="app-container">
      <div className="dashboard-header">
        <div className="header-spacer" />
        <h1 className="sub-heading">V-Trance {auth.user?.username}</h1>
        <button onClick={() => auth.logOut()} className="logout-button">
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
