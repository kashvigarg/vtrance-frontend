import React, { useState } from "react";
import "../../App.css";

const formats = ["H.264", "H.265", "H.264 lossless", "MPEG-2", "MPEG-4"];

const Options = () => {
  const [selectedFormat, setSelectedFormat] = useState("H.264");

  const handleClear = () => {
    setSelectedFormat("H.264");
  };

  return (
    <div className="options-container">
      <div className="options-header">
        <h2>Select Transcoding Format</h2>
        <button
          className="restart-btn"
          onClick={handleClear}
          title="Clear Selection"
        >
          <img src="icons/clear.svg" alt="" className="restart-icon" />
        </button>
      </div>
      <div className="options">
        {formats.map((format) => (
          <label key={format} className="option">
            <input
              type="radio"
              name="format"
              value={format}
              checked={selectedFormat === format}
              onChange={() => setSelectedFormat(format)}
            />
            <span className="dot" />
            <span className="label-text">{format}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Options;
