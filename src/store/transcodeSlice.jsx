import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API Methods
export const fetchUser = sendTranscodeBuffer(
  "transcode/url",
  async (buffer, thunkAPI) => {
    const response = await fetch(`https://api.example.com/transcode/${buffer}`);
    if (!response.ok) throw new Error("Failed to send buffer");
    return await response.json();
  }
);

// Method Slice
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
  extraReducers: (builder) => {
    builder
      .addCase(sendTranscodeBuffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  },
});

export const { setStreaming } = transcodeSlice.actions;
export default transcodeSlice.reducer;
