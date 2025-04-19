import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDragging,
  setSelectedFile,
  clearSelectedFile,
} from "../../store/fileSlice";
import formatFileSize from "./helper";
import customToast from "./custom-toast";

const MAX_SIZE = 300 * 1024 * 1024;

const DragDropComponent = () => {
  const dispatch = useDispatch();
  const { isDragging, selectedFile } = useSelector((state) => state.fileUpload);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        customToast("File size exceeds 300MB!");
        return;
      }
      dispatch(setSelectedFile(file));
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    dispatch(setDragging(true));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    dispatch(setDragging(false));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dispatch(setDragging(false));

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > MAX_SIZE) {
        customToast("File size exceeds 300MB!");
        return;
      }
      dispatch(setSelectedFile(file));
    }
  };

  const removeSelectedFile = () => {
    dispatch(clearSelectedFile());
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
          <button onClick={() => fileInputRef.current.click()}>
            Upload a Video
          </button>
          <input
            type="file"
            accept="video/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </>
      ) : (
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: "10px",
          }}
        >
          <video
            src={URL.createObjectURL(selectedFile)}
            controls
            style={{
              borderRadius: "10px",
              maxWidth: "40vw",
              width: "auto",
              height: "auto",
              objectFit: "contain",
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
            ×
          </button>
          <div style={{ marginTop: "10px", fontSize: "14px", color: "#444" }}>
            {`Size: ${formatFileSize(selectedFile.size)}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropComponent;
