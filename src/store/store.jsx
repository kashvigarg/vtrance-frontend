import { configureStore } from '@reduxjs/toolkit';
import formatReducer from './formatSlice';
import fileReducer from './fileSlice';
import transcodeReducer from './transcodeSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    format: formatReducer,
    fileUpload: fileReducer,
    transcodeReducer: transcodeReducer,
    auth: authReducer,
  },
});
