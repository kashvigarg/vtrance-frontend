import React from "react";
import '../App.css'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { signupUser } from '../services/authService';

const Signup = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const result = await signupUser(data);
      dispatch(setCredentials(result)); 
    } catch (err) {
      console.error('Signup failed', err);
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
