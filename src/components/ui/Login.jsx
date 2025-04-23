import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import '../../App.css'

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      // Please enter a valid username. It must contain at least 6 characters.
      // your password should be more than 6 character
      auth.loginAction(input);
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
          name="username"
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