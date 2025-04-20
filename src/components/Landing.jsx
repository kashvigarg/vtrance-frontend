import React from "react";
import '../App.css'
import Login from "./ui/Login";
import { Link } from "react-router-dom";

const Landing = () => {

    return (
       <div className="app-container">
        <h1 className="main-heading"> V-Trance </h1> 
     <h1 style={{color:"aquamarine"}}> 	On demand Video Transcoding & Streaming </h1>
     <br/>
     <Login/>
     <span> Not a registered user? <Link to="/signup">Sign Up Now</Link></span>
       </div> 
    );
}

export default Landing;