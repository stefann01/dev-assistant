import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const PrivateRoute = () => {
  const [user] = useAuthState(auth);
  return true ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
