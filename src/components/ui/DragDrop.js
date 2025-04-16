import React, { useState, useRef } from "react";
import formatFileSize from "./helper";

const DragDropComponent = () => {
  const [isDragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const removeSelectedFile = () => {
    // fileInputRef.current.value = null; // Reset file input value
    setSelectedFile(null);
  };

  return (
    <div 
      className={`file-drop-zone ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {!selectedFile ? (
        <>
          <img
            src="./icons/upload.png"
            alt=""
            style={{ height: "20vh", width: "auto", margin: "20px" }}
          />
          <br />
          Drag and Drop or{" "}
          <button onClick={() => fileInputRef.current.click()}>Upload a Video</button>
          <input
            type="file"
            accept="video/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </>
      ) : (
        <div style={{ position: "relative", display: "inline-block", marginTop: "10px" }}>
          <video
            src={URL.createObjectURL(selectedFile)}
            controls
            style={{
                borderRadius: "10px",
                // minHeight: "30%",
                // maxHeight: "50%",
                maxWidth: "40vw",
                width: "auto",
                height: "auto",
                objectFit: "contain"
              }}
          />
          <button
            onClick={removeSelectedFile}
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              background: "red",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
          </button>
          <div style={{ marginTop: "10px", fontSize: "14px", color: "#444" }}>
            {`Size: ${formatFileSize(selectedFile.size)}`}
            <br/>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropComponent;
