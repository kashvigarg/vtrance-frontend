import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./router/route";
import Landing from './components/Landing';
import { ToastContainer } from 'react-toastify';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  return (
      <Router>
      <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
      <ToastContainer />
      </Router>
  );
}

export default App;
