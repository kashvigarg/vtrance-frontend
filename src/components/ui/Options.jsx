import { useState } from "react";
import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setJobId,
  setStreaming,
  setLoading,
  setVideoId
} from "../../store/processSlice";
import { notifyUpload, uploadVideo } from "../../services/videoService";
import { getValidResolutions, getValidCodecFormats, getFileFromUrl } from "../utils/helperMethods";
import {
  changeTranscodeOptions,
} from "../../store/processSlice";
import api from "../../services/api";

const outputFormats = ["MP4", "MKV", "WebM", "DASH"];

const Options = () => {
  const { isDragging,
    fileUrl,
    fileName,
    fileSize, // MB
    fileType,
    fileDuration,
    fileHeight,
    fileWidth } = useSelector((state) => state.fileController);

  const outputFormat = useSelector(
    (state) => state.processController.outputFormat
  );
  const codecFormat = useSelector(
    (state) => state.processController.codecFormat
  );
  const resolution = useSelector((state) => state.processController.resolution);
  const [mode, setMode] = useState("transcoding");
  const dispatch = useDispatch();

  let resolutions = getValidResolutions(fileHeight);
  let codecformats = getValidCodecFormats(outputFormat);

  const handleVideoUpload = async () => {
    if (!fileUrl) return;
    try {
      const file = await getFileFromUrl(fileUrl, fileName)

      const urlResponse = await uploadVideo(fileName, fileType, fileHeight, file);
      dispatch(setVideoId(urlResponse.videoid));
    
      const res = await notifyUpload(mode, outputFormat, codecFormat, resolution, urlResponse.videoid);
      const jobid = res.jobid;
      dispatch(setJobId(jobid));
      dispatch(setStreaming({ mode: mode }))
      dispatch(setLoading({ loading: true }));
    } catch (error) {
      console.log(error)
    }
  }

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
        <option value="transcoding">Transcode Only</option>
        <option value="streaming">Transcode + Stream</option>
      </select>
      <div style={{ paddingBottom: "10px"}} />
      {mode === "transcoding" && (
        <div className="options">
          <div>
            <i>Select Transcoding Format</i>
            <br /><br />
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
            <br /><br />
            {outputFormats.map((out) => (
              <label key={out} className="option">
                <input
                  type="radio"
                  name="out"
                  value={out}
                  checked={outputFormat === out}
                  onChange={() => {
                    if (!(codecFormat in codecformats)) {
                      dispatch(changeTranscodeOptions({ codecFormat: codecformats[0] }))
                    }
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
            <br /><br />
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

      {mode === "streaming" && (
        <div className="options">
          <div>
            <i>Select Transcoding Format</i>
            <br /><br />
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
      <br /><br />
      <button onClick={() => { handleVideoUpload() }} title="Proceed">
        Proceed
      </button>
    </div>
  );
};

export default Options;
