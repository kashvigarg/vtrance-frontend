import { createSlice } from '@reduxjs/toolkit';

const formatSlice = createSlice({
  name: 'format',
  initialState: {
    value: "H.264",
  },
  reducers: {
    setFormat: (state, action) => {
      state.value = action.payload;
    },
    clearFormat: (state) => {
        state.value = "H.264";
    }
  },
});

export const { setFormat, clearFormat } = formatSlice.actions;
export default formatSlice.reducer;
