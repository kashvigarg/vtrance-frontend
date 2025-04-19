import { configureStore } from '@reduxjs/toolkit';
import formatReducer from './formatSlice';
import fileReducer from './fileSlice';

export const store = configureStore({
  reducer: {
    format: formatReducer,
    fileUpload: fileReducer,
  },
});
