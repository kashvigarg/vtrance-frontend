import React from "react";
import '../../App.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      // const result = await signupUser(data);
      // dispatch(setCredentials(result)); 
      navigate("/dashboard")
    } catch (err) {
      console.error('Signup failed', err);
      alert('Signup failed');
    }
  };

  return (
    <div>
      {/* <h1 style={{color:"aquamarine"}}> 	Create a New Account </h1> */}
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" required /> <br/>
      <input name="email" type="email" placeholder="Email" required /> <br/>
      <input name="password" type="password" placeholder="Password" required /> <br/>
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default Signup;
