import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from  '../context/AuthContext.jsx'


export default function ProtectedRoute({ children }) {
  let { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? children : <Navigate to="/" />;
}
