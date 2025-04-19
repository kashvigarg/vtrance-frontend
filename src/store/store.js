import { configureStore } from '@reduxjs/toolkit';
import formatReducer from './formatSlice';

export const store = configureStore({
  reducer: {
    format: formatReducer,
  },
});
