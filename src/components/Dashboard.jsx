import React, { useEffect } from "react";
import DragDropComponent from "./ui/DragDrop";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import CustomHeader from "./ui/CustomHeader";
import Options from "./ui/Options";
import { useNavigate } from "react-router-dom";
import CustomLoader from "./ui/CustomLoader";
import CustomEmbedWidget from "./ui/EmbedWidget";
import CustomDownloadWidget from "./ui/DownloadWidget";
import VideoPlayer from "./ui/VideoPlayer";
import { getJobStatus, fetchStreamVideoUrl, fetchDownloadVideoUrl } from "../services/videoService";
import customToast from "./ui/CustomToast";
import { clearSelectedFile } from "../store/fileSlice";
import { setProcessed, setLoading, resetProcessState } from "../store/processSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.processController.loading);
  const refreshToken = useSelector((state) => state.authController.refreshToken);
  const accessToken = useSelector((state) => state.authController.accessToken);
  const processed = useSelector((state) => state.processController.processed);
  const jobId = useSelector((state) => state.processController.jobid);
  const videoId = useSelector((state) => state.processController.videoId);
  const streamUrl = useSelector((state) => state.processController.streamUrl);
  const downloadUrl = useSelector((state) => state.processController.downloadUrl);
  const streaming = useSelector((state) => state.processController.streaming);
  const fileName = useSelector((state) => state.fileController.fileName);
  const outputFormat = useSelector(
    (state) => state.processController.outputFormat
  );

  const goToProfile = () => {
    // customToast("Go to Profile!")
    navigate("/profile");
  };

  useEffect(() => {
    if (!loading || !jobId) return;

    const checkStatus = async () => {
      const status = await getJobStatus(jobId);
      if (status === "REJECTED") {
        customToast("Sorry, we couldn't process your media :(")
        dispatch(setLoading({ loading: false }))
        dispatch(setProcessed({ processed: false }))
      } else {
        dispatch(setLoading({ loading: true }));
        if (!streaming) {
          const downloadUrl = await fetchDownloadVideoUrl(videoId, fileName, outputFormat);
          const urlRes = downloadUrl.downloadUrl;
          dispatch(setLoading({ loading: false }));
          dispatch(setProcessed({ processed: true, downloadUrl: urlRes }))
          return;
        } else {
          const streamUrl = await fetchStreamVideoUrl(videoId);
          const urlRes = streamUrl.streamUrl;
          dispatch(setLoading({ loading: false }));
          dispatch(setProcessed({ processed: true, streamUrl: urlRes }))
        }
      }
    };

    checkStatus();
  }, [loading, jobId]);

  const handlePostProcessCleanup = () => {
    dispatch(setLoading({ loading: false }));
    dispatch(setProcessed({ processed: false }))
    dispatch(clearSelectedFile())
    dispatch(resetProcessState())
  }

  return (
    <div className="app-container">
      <CustomHeader />
      <div className="dashboard-body">
        {processed && streaming ?
          <VideoPlayer src={streamUrl} autoPlay />

          : <DragDropComponent />}

        {loading ? (
          <div style={{ alignItems: "center" }}>
            <CustomLoader size="10vw" />
            <h2>Hold on while we process your media...</h2>
          </div>
        ) : (
          processed ? streaming ? <CustomEmbedWidget link={streamUrl}/> : <CustomDownloadWidget downloadLink={downloadUrl}  fileName={fileName} outputFormat={outputFormat}/> :
            <Options />
        )}

        {!loading && processed ? (
         <button onClick={() => { handlePostProcessCleanup() }} title="process-new-video">
        Process new Video
      </button>
   ) : null }
      </div>
    </div>
  );
};

export default Dashboard;
