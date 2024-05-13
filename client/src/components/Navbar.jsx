import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'
import { useAuth } from "../store/auth";
const Navbar = () => {
  const {isLoggedIn}=useAuth();
  return (
    <header>
      <div className="container">
        <div className="brand-logo">
          {/* <NavLink to={"/"}>Manoj Sharma</NavLink> */}
          <a href="#">Manoj Sharma</a>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>About</NavLink>
            </li>
            <li>
              <NavLink to={"/services"}>Services</NavLink>
            </li>
            <li>
              <NavLink to={"/contact"}>Contact-Us</NavLink>
            </li>
            {isLoggedIn?
            <li>
              <NavLink to={"/logout"}>Logout</NavLink>
            </li>:<>
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li>
              <NavLink to={"/register"}>SignUp</NavLink>
            </li>
            </>}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
