import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function App() {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn ,   setUserData } = useContext(AuthContext);

  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    setUserData(null);
    navigate("/login");
  }

  return (
    <>
      <HeroNavbar>
        <NavbarBrand className="cursor-pointer" onClick={() => navigate("/")}>
          <p className="font-bold text-inherit">Linked Posts</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          {isLoggedIn ? (
            <>
              <NavbarItem>
                <NavLink to="/profile" className="cursor-pointer">
                  Profile
                </NavLink>
              </NavbarItem>

              <NavbarItem onClick={logOut} className="cursor-pointer">
                Logout
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <NavLink to="/register">SignUp</NavLink>
              </NavbarItem>

              <NavbarItem>
                <NavLink to="/login">Login</NavLink>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </HeroNavbar>
    </>
  );
}
