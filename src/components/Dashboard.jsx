import React, { useEffect } from "react";
import DragDropComponent from "./ui/DragDrop";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import CustomHeader from "./ui/CustomHeader";
import Options from "./ui/Options";
import { useNavigate } from "react-router-dom";
import CustomLoader from "./ui/CustomLoader";
import CustomEmbedWidget from "./ui/EmbedWidget";
import VideoPlayer from "./ui/VideoPlayer";

const Dashboard = () => {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.processController.loading);
  const processed = useSelector((state) => state.processController.processed);
  const streaming = useSelector((state) => state.processController.streaming);

  const goToProfile = () => {
    // customToast("Go to Profile!")
    navigate("/profile");
  };

  // TODO: Add selectFile and selectFormat Hooks in Parent

  return (
    <div className="app-container">
      <CustomHeader />
      <div className="dashboard-body">
        {processed && streaming ? 
        // <VideoPlayer /> 
        <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" autoPlay />
        
        : <DragDropComponent />}
        
        {loading ? (
          <div style={{ alignItems: "center" }}>
            <CustomLoader size="10vw" />
            <h2>Hold on while we process your media...</h2>
          </div>
        ) : (
          processed && streaming? <CustomEmbedWidget/> : 
          <Options />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
