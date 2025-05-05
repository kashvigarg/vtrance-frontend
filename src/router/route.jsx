import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';


const PrivateRoute = () => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated===false) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;