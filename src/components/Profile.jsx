import { useEffect, useState } from "react";
import { getUserVideos } from "../services/videoService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomHeader from "./ui/custom-header";
import customToast from "./ui/custom-toast";
import CustomLoader from "./ui/loading-widget";

const Profile = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.authController);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      // setLoading(true);
      // res = await getUserVideos();
      // setVideos(res);
    } catch (error) {
      customToast("Failed to fetch user videos :(");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="app-container">
      <CustomHeader/>
      <h1 style={{ color: "aquamarine" }}> Welcome user.name </h1>
      <div style={{ justifyItems: "start", padding: "30px" }}>
        <h3><i> Videos uploaded by you </i></h3>
        <div style={{ display: "flex", justifySelf: "center", padding:"40px" }}>
          {loading ? (
            <CustomLoader />
          ) : videos.length === 0 ? (
            <p>No videos found</p>
          ) : (
            <ul>
              {videos.map((video) => (
                <li key={video.id}>{video.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
