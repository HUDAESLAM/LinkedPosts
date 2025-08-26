import { createContext, useState, useEffect } from "react";
import { sendUserDataApi } from "../Services/authServices";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const [userData, setUserData] = useState(null);

  
  async function getLoggedUserData() {
    const response = await sendUserDataApi();
    console.log(response);
    if (response.message) {
      setUserData(response.user);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
      getLoggedUserData();
    } else {
      localStorage.removeItem("isLoggedIn");
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
