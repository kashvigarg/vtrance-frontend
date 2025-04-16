import './App.css';
import AuthProvider from './hooks/AuthProvider';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./router/route";
import Landing from './components/Landing';
import { ToastContainer, toast } from 'react-toastify';
import Signup from './components/Signup';

function App() {
  return (
    // <div className='App'>
      <Router>
      <AuthProvider>
      <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route >
             {/* element={<PrivateRoute />}> */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* Other routes */}
          </Routes>
      </AuthProvider>
      <ToastContainer />
      </Router>
      
    // </div>
  );
}

export default App;
