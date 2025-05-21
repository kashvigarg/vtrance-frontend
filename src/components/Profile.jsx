import { useEffect, useState } from "react";
import { getUserVideos } from "../services/videoService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomHeader from "./ui/CustomHeader";
import customToast from "./ui/CustomToast";
import CustomLoader from "./ui/CustomLoader";

const Profile = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.authController);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await getUserVideos();
      setVideos(res);
    } catch (error) {
      console.log(error)
      customToast("Failed to fetch user videos :(");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="app-container">
  <CustomHeader />
  <h1 style={{ color: "aquamarine" }}>Welcome User</h1>

  <div style={{ padding: "30px", backgroundColor: "black" }}>
    <h3><i>Videos streamed by you</i></h3>

    <div style={{ padding: "40px", backgroundColor: "black" }}>
      {loading ? (
        <CustomLoader />
      ) : videos.length === 0 ? (
        <p style={{ color: "white" }}>No videos found</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {videos.map((video) => (
            <li
              key={video.id}
              style={{
                padding: "20px 0",
                color: "white",
              }}
            >
              <strong>TITLE:</strong> {video.name}
              <br />
              <strong>URL:</strong> {video.url}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>
  );
};

export default Profile;
