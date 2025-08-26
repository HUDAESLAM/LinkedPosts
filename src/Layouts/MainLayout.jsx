import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function mainLayout() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 pt-4 min-h-screen">
        <Outlet />
      </div>
      <footer />
    </>
  );
}
