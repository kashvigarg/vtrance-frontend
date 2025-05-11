import React, { useState } from "react";
import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import CustomLoader from "./CustomLoader";
import CustomEmbedWidget from "./EmbedWidget";
import { getValidResolutions, getValidCodecFormats } from "../utils/helperMethods";
import {
  changeTranscodeOptions,
  setDefaultOptions,
} from "../../store/processSlice";

const outputFormats = ["MP4", "MKV", "WebM", "DASH"];

const Options = () => {

  const outputFormat = useSelector(
    (state) => state.processController.outputFormat
  );
  const codecFormat = useSelector(
    (state) => state.processController.codecFormat
  );
  const resolution = useSelector((state) => state.processController.resolution);
  const [mode, setMode] = useState("transcode");
  const dispatch = useDispatch();
  const fileHeight = useSelector((state) => state.fileController.fileHeight);

  let resolutions = getValidResolutions(fileHeight);
  console.log(fileHeight)
  let codecformats = getValidCodecFormats(outputFormat);

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
            <br/><br/>
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
            <br/><br/>
            {outputFormats.map((out) => (
              <label key={out} className="option">
                <input
                  type="radio"
                  name="out"
                  value={out}
                  checked={outputFormat === out}
                  onChange={() => {
                    if (out === "WebM") {
                      dispatch(changeTranscodeOptions({ outputFormat: out, codecFormat: "VP9" }));
                    } else {
                      dispatch(changeTranscodeOptions({ outputFormat: out }));
                    }
                  }}

                />
                <span className="dot" />
                <span className="label-text">{out}</span>
              </label>
            ))}
          </div>
          <div>
            <i>Select Resolution</i>
            <br/><br/>
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
            <br/><br/>
            <label key={"H.264"} className="option">
              <input
                type="radio"
                name="stream"
                value={"H.264"}
                checked={true}
                onChange={() => { }}
              />
              <span className="dot" />
              <span className="label-text">{"H.264"}</span>
            </label>
          </div>
        </div>
      )}
      <br/><br/>
      <button onClick={() => { }} title="Proceed">
        Proceed
      </button>
    </div>
  );
};

export default Options;
