import React, { useState } from "react";
import "../../App.css";
import { useSelector, useDispatch } from 'react-redux';
import { setFormat, clearFormat } from '../../store/formatSlice';

const formats = ["H.264", "H.265", "H.264 lossless", "MPEG-2", "MPEG-4"];

const Options = () => {
  const selectedFormat = useSelector((state) => state.format.value);
  const dispatch = useDispatch();

  return (
    <div className="options-container">
      <div className="options-header">
        <h2>Select Transcoding Format</h2>
        <button
          className="restart-btn"
          onClick={() => dispatch(clearFormat())}
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
              onChange={() => dispatch(setFormat(format))}
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
