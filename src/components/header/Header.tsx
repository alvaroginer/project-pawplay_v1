import { NavLink } from "react-router";
import { useState } from "react";
import { NavigationMenu } from "../navigationMenu/NavigationMenu";
import "../../index.css";
import "./Header.css";
import logo from "../../imgs/Logo-black.svg";
import menu from "../../imgs/menu.svg";

export const Header = () => {
  const [navigationMenuDisplay, setNavigationMenuDisplay] =
    useState<boolean>(false);

  const handleNavMenuDisplay = () => {
    setNavigationMenuDisplay(!navigationMenuDisplay);
  };

  return (
    <>
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
          <button className="navigation-menu--button">
            <img src={menu} alt="Menu Icon" onClick={handleNavMenuDisplay} />
          </button>
        </div>
      </div>
      {navigationMenuDisplay && (
        <NavigationMenu onClick={handleNavMenuDisplay} />
      )}
    </>
  );
};
