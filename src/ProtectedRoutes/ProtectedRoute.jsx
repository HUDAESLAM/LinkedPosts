import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token')!=null);
  

  return isLoggedIn ? children : <Navigate to="/login" />;
  
}
