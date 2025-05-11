import React from "react";
import "../App.css";
import Login from "./ui/Login";
import Signup from "./ui/Signup";
import { Link } from "react-router-dom";
import { useState } from "react";

const Landing = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="app-container">
      <h1 className="main-heading"> V-Trance </h1>
      <h1 style={{ color: "aquamarine" }}>
        {" "}
        On demand Video Transcoding & Streaming{" "}
      </h1>
      <br />
      {isLogin ? (
        <div>
          <Login />
          <span>
            Not a registered user?{" "}
            <span
              onClick={() => setIsLogin(false)}
              style={{color:"blue", cursor:"pointer"}}
            >
              <u>Sign Up Now</u>
            </span>
          </span>
        </div>
      ) : (
        <div>
          <Signup />
          <span>
            Already have an Account?{" "}
            <span
              onClick={() => setIsLogin(true)}
              style={{color:"blue", cursor:"pointer"}}
            >
              <u>Login</u>
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Landing;
