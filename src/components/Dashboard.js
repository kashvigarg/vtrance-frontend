import React, { useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";
import DragDropComponent from "./ui/DragDrop";
import "../App.css";

const Dashboard = () => {
  const auth = useAuth();

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
      <DragDropComponent/>
    </div>
  );
};

export default Dashboard;
