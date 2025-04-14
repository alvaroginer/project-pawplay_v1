import { NavLink } from "react-router";
import "../../index.css";
import "./Header.css";
import logo from "../../imgs/Logo-black.svg";
import menu from "../../imgs/menu.svg";

export const Header = () => {
  return (
    <div className="headbar">
      <NavLink to="">
        <img src={logo} alt="PawPlay Logo" />
      </NavLink>
      <div className="header--nav-container">
        <NavLink to="" className="btn margin--right__40">
          Create Event
        </NavLink>
        <NavLink to="login" className="margin--right__14">
          Sign In
        </NavLink>
        <img src={menu} alt="Menu Icon" />
      </div>
    </div>
  );
};
