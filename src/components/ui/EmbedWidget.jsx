import React from "react";

const CustomEmbedWidget = () => {
  return (
    <div>
      <h2>Embed this Video</h2>

      <div>
        Copy the text below
        <br />
        <br />
        <textarea id="a" onClick={()=>{}} cols="55" rows="6" defaultValue={"ecbjwbvwkebk"} style={{backgroundColor: "gray"}}>
        </textarea>
      </div>

      <div style={{padding:"20px"}}>
      <a href="">Copy Stream Link</a>
      </div>
      
    </div>
  );
};

export default CustomEmbedWidget;
