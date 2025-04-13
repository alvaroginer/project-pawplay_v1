import { NavLink } from "react-router";
import "../../index.css";
import "./Header.css";

export const Header = () => {
  return (
    <div className="headbar">
      <NavLink to="">
        <img src="imgs/Logo-black.svg" alt="PawPlay Logo" />
      </NavLink>
      <div className="header--nav-container">
        <NavLink to="" className="btn margin--right__40">
          Create Event
        </NavLink>
        <NavLink to="login" className="margin--right__14">
          Sign In
        </NavLink>
        <img src="imgs/menu.svg" alt="Menu Icon" />
      </div>
    </div>
  );
};
