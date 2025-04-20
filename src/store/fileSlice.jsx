import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDragging: false,
  selectedFile: null,
};

const fileSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {
    setDragging: (state, action) => {
      state.isDragging = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    clearSelectedFile: (state) => {
      state.selectedFile = null;
    },
  },
});

export const { setDragging, setSelectedFile, clearSelectedFile } = fileSlice.actions;
export default fileSlice.reducer;
