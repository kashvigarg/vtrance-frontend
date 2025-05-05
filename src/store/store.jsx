import { configureStore } from '@reduxjs/toolkit';
import formatReducer from './formatSlice';
import fileReducer from './fileSlice';
import transcodeReducer from './transcodeSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    formatSlice: formatReducer,
    fileUploadSlice: fileReducer,
    transcodeSlice: transcodeReducer,
    auth: authReducer,
  },
});
