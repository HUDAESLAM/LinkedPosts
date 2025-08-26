import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";


export default function ProtectedRoute({ children }) {
  let { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? children : <Navigate to="/" />;
}
