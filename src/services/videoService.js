import api from './api';

export const uploadVideo = async (credentials) => {
  const res = await api.post('/login', credentials);
  return res.data; 
};

export const getUserVideos = async (userid) => {
    const res = await api.post('/signup', formData); 
    return res.data; 
};
  