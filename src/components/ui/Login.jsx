import { useState } from "react";
import '../../App.css'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { loginUser } from '../../services/authService';

const Login = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    useremail: "",
    password: "",
  });

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    
    if (input.useremail !== "" && input.password !== "") {
      try {
        const credentials = {
          email: input.useremail,
          password: input.password,
        };
        const data = await loginUser(credentials);
        dispatch(setCredentials(data));
      } catch (err) {
        console.error('Login failed', err);
        alert('Login failed');
      }
      return;
    }
    console.log(input)
    alert("Please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (     
    <form onSubmit={handleSubmitEvent}  >
    {/* style={{background:"white", padding:"30px", marginLeft:"20%", marginRight:"20%"}} */}
      <div className="form_control">
        <label  style={{ color: 'white' }} htmlFor="user-email">Email:</label>
        <input
          type="email"
          id="user-email"
          name="useremail"
          placeholder="guest@google.com"
          aria-describedby="user-email"
          aria-invalid="false"
          onChange={handleInput}
        />
      </div>
      <div className="form_control">
        <label  style={{ color: 'white' }} htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};

export default Login;