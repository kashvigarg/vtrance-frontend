import axios from 'axios';
import { store } from '../store/store';
import { updateAccessToken, logout } from '../store/authSlice';

const api = axios.create({
  baseURL: '',
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const accessToken = state.authController.accessToken;
  const refreshToken = state.authController.refreshToken;

  if (config.url.includes('/signup') || config.url.includes('/login')) {
    return config;
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    config.headers['X-Refresh-Token'] = refreshToken;
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
        const res = await axios.get('https://your-backend.com/api/refresh', {
          headers: {
            'X-Refresh-Token': store.getState().authController.refreshToken,
          },
        });

        if (res.data.accessToken) {
          store.dispatch(updateAccessToken(res.data.accessToken));

          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshErr) {
        store.dispatch(logout());
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
