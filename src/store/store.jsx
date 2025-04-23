import { configureStore } from '@reduxjs/toolkit';
import formatReducer from './formatSlice';
import fileReducer from './fileSlice';
import transcodeReducer from './transcodeSlice';

export const store = configureStore({
  reducer: {
    format: formatReducer,
    fileUpload: fileReducer,
    transcodeReducer: transcodeReducer,
  },
});
