import { NavMenuProps } from "../../types";
import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import close from "../../imgs/close-thick.svg";
import "./NavigationMenu.css";

export const NavigationMenu = ({ onClick }: NavMenuProps) => {
  const { user } = useContext(AuthContext);

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
          to={`/profile/${user.loggedProfile}`}
        >
          My account
        </NavLink>
        <NavLink className="navigation-menu--link" to="/profile">
          My events
        </NavLink>
      </div>
      <div className="navigation-menu--container-link">
        <NavLink className="navigation-menu--link" to="/create">
          Create Event
        </NavLink>
      </div>
      <div className="navigation-menu--container-link">
        <NavLink className="navigation-menu--link" to="/about">
          About us
        </NavLink>
        <NavLink className="navigation-menu--link" to="/contact">
          Contact us
        </NavLink>
      </div>
      <button className="log-out--button">Log Out</button>
    </nav>
  );
};
