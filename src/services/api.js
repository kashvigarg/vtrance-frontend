import axios from 'axios';
import { store } from '../store/store';
import { updateAccessToken, logout } from '../store/authSlice';

const api = axios.create({
  baseURL: '',
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh-token')
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.get('https://your-backend.com/api/refresh-token', {
          withCredentials: true,
        });

        const newAccessToken = res.data.accessToken;
        store.dispatch(updateAccessToken(newAccessToken));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest); 
      } catch (refreshErr) {
        store.dispatch(logout());
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
