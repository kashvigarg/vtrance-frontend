import { createSlice } from "@reduxjs/toolkit";

const transcodeSlice = createSlice({
  name: "transcodeSlice",
  initialState: {
    streaming: false,
    loading: false,
    error: null,
    format: 'H.264'
  },
  reducers: {
    setStreaming: (state, action) => {
      state.streaming = action.payload.streaming;
    },
    changeFormat: (state, action) => {
      state.format = action.payload.format;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    }
  },
});

export const { setStreaming } = transcodeSlice.actions;
export default transcodeSlice.reducer;
