import { NavLink } from "react-router";
import { useState, useContext } from "react";
import { NavigationMenu } from "../navigationMenu/NavigationMenu";
import { Button } from "../button/Button";
import { AuthContext } from "../../auth/AuthContext";
import "../../index.css";
import "./Header.css";
import logo from "../../imgs/Logo-black.svg";
import menu from "../../imgs/menu.svg";
import profileUserImg from "../../imgs/account-circle.svg";

export const Header = () => {
  const [navigationMenuDisplay, setNavigationMenuDisplay] =
    useState<boolean>(false);

  const handleNavMenuDisplay = () => {
    setNavigationMenuDisplay(!navigationMenuDisplay);
  };
  const { user, loggedProfile } = useContext(AuthContext);

  return (
    <>
      <div className="headbar">
        <NavLink to="">
          <img src={logo} alt="PawPlay Logo" />
        </NavLink>
        <div className="header--nav-container">
          <NavLink to="">
            <Button className="primary">Create event</Button>
          </NavLink>
          {user ? (
            <NavLink
              // to={`/profile/${loggedProfile.id}`}
              to="/profile-selection"
              className="navigation-menu--button__sign-in"
            >
              <img src={profileUserImg} alt="Profile Icon" />
            </NavLink>
          ) : (
            <NavLink to="signin" className="navigation-menu--button__sign-in">
              Sign In
            </NavLink>
          )}
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
