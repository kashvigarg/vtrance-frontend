import { createSlice } from "@reduxjs/toolkit";

const processController = createSlice({
  name: "processController",
  initialState: {
    streaming: false,
    processed: false, 
    loading: false,
    error: null,
    outputFormat: 'mp4',
    codecFormat: 'H.264',
    resolution : '480p'
  },
  reducers: {
    setStreaming: (state, action) => {
      state.streaming = action.payload.streaming;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
    changeTranscodeOptions: (state, action) => {
      if (action.payload.codecFormat !== undefined){
        state.codecFormat = action.payload.codecFormat;
      }
      if (action.payload.outputFormat !== undefined) {
        state.outputFormat = action.payload.outputFormat;
      }
      if (action.payload.resolution !== undefined){
        state.resolution = action.payload.resolution;
      }
    },
    setDefaultOptions : (state, action) => {
      state.codecFormat = 'H.264';
      state.outputFormat = 'mp4';
      state.resolution = '480p';
    }
  },
});

export const { setStreaming, changeTranscodeOptions, setDefaultOptions } = processController.actions;
export default processController.reducer;
