import React, { useState } from "react";
import "../../App.css";

const formats = ["H.264", "H.265", "H.264 lossless", "MPEG-2", "MPEG-4"];

const Options = () => {
  const [selectedFormat, setSelectedFormat] = useState("");

  return (
    <div className="options-container">
      <h2>Select Transcoding Format</h2>
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
