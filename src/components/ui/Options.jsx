import React, { useState } from "react";
import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import CustomLoader from "./loading-widget";
import CustomEmbedWidget from "./EmbedWidget";
import {
  changeTranscodeOptions,
  setDefaultOptions,
} from "../../store/processSlice";

const codecformats = ["H.264", "H.265", "H.264 lossless", "MPEG-2", "MPEG-4"];
const outputFormats = ["mp4"];
const resolutions = ["480p", "720p", "1080p"];

const Options = () => {
  const codecFormat = useSelector(
    (state) => state.processController.codecFormat
  );
  const outputFormat = useSelector(
    (state) => state.processController.outputFormat
  );
  const resolution = useSelector((state) => state.processController.resolution);
  const [mode, setMode] = useState("transcode");
  const dispatch = useDispatch();

  return (
    <div className="options-container">
      <div className="options-header">
        <h2
          style={{
            textAlign: "center",
            margin: "0 auto",
            paddingBottom: "20px",
            color: "aquamarine"
          }}
        >
          Choose Mode
        </h2>
      </div>
      <select
        id="mode-select"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="transcode">Transcode Only</option>
        <option value="stream">Transcode + Stream</option>
      </select>
      <div style={{ paddingBottom: "10px" }} />
      {mode === "transcode" && (
        <div className="options">
          <div>
            <i>Select Transcoding Format</i>
            {codecformats.map((format) => (
              <label key={format} className="option">
                <input
                  type="radio"
                  name="format"
                  value={format}
                  checked={codecFormat === format}
                  onChange={() =>
                    dispatch(changeTranscodeOptions({ codecFormat: format }))
                  }
                />
                <span className="dot" />
                <span className="label-text">{format}</span>
              </label>
            ))}
          </div>
          <div>
            <i>Select Output Format</i>
            {outputFormats.map((out) => (
              <label key={out} className="option">
                <input
                  type="radio"
                  name="out"
                  value={out}
                  checked={outputFormat === out}
                  onChange={() =>
                    dispatch(changeTranscodeOptions({ outputFormat: out }))
                  }
                />
                <span className="dot" />
                <span className="label-text">{out}</span>
              </label>
            ))}
          </div>
          <div>
            <i>Select Resolution</i>
            {resolutions.map((res) => (
              <label key={res} className="option">
                <input
                  type="radio"
                  name="res"
                  value={res}
                  checked={resolution === res}
                  onChange={() =>
                    dispatch(changeTranscodeOptions({ resolution: res }))
                  }
                />
                <span className="dot" />
                <span className="label-text">{res}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {mode === "stream" && (
        <div className="options">
          <div>
            <i>Select Transcoding Format</i>
            <label key={"H.264"} className="option">
              <input
                type="radio"
                name="stream"
                value={"H.264"}
                checked={true}
                onChange={() => {}}
              />
              <span className="dot" />
              <span className="label-text">{"H.264"}</span>
            </label>
          </div>
        </div>
      )}

        <button onClick={() => {}} title="Proceed">
          Proceed
        </button>
    </div>
  );
};

export default Options;
