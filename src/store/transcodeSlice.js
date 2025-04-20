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
  name: "transcode",
  initialState: {
    streaming: false,
    loading: false,
    error: null,
  },
  reducers: {
    setStreaming: (state, action) => {
      state.streaming = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendTranscodeBuffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendTranscodeBuffer.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(sendTranscodeBuffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setStreaming } = transcodeSlice.actions;
export default transcodeSlice.reducer;
