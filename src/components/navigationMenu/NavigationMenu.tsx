import { NavMenuProps } from "../../types";
import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../hooks/auth/AuthContext";
import close from "../../imgs/close-thick.svg";
import "./NavigationMenu.css";

export const NavigationMenu = ({ onClick }: NavMenuProps) => {
  const { loggedProfile } = useContext(AuthContext);

  if (loggedProfile === null) return;
  return (
    <nav className="navigation-menu">
      <div className="navigation-menu--header">
        <button className="close-button" onClick={() => onClick(true)}>
          <img src={close} alt="Close Icon" />
        </button>
      </div>
      <div className="navigation-menu--container-link">
        <NavLink
          className="navigation-menu--link"
          to={`/profile/${loggedProfile.id}`}
          onClick={() => onClick(true)}
        >
          My account
        </NavLink>
        <NavLink
          className="navigation-menu--link"
          to="/profile"
          onClick={() => onClick(true)}
        >
          My events
        </NavLink>
        <NavLink
          className="navigation-menu--link"
          to="/profile-selection"
          onClick={() => onClick(true)}
        >
          My profiles
        </NavLink>
      </div>
      <div className="navigation-menu--container-link">
        <NavLink
          className="navigation-menu--link"
          to="/create"
          onClick={() => onClick(true)}
        >
          Create Event
        </NavLink>
      </div>
      <div className="navigation-menu--container-link">
        <NavLink
          className="navigation-menu--link"
          to="/about"
          onClick={() => onClick(true)}
        >
          About us
        </NavLink>
        <NavLink
          className="navigation-menu--link"
          to="/contact"
          onClick={() => onClick(true)}
        >
          Contact us
        </NavLink>
      </div>
      <button className="log-out--button">Log Out</button>
    </nav>
  );
};
