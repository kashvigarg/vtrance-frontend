import api from './api';

export const loginUser = async (credentials) => {
  const res = await api.post('/user/login',
    JSON.stringify(credentials)
  );
  
  return res.data; 
};

export const signupUser = async (formData) => {
    const res = await api.post('/user/signup',
    JSON.stringify(formData)); 
    return res.data;
};
  