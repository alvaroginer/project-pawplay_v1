import { NavLink } from "react-router";
import { useState, useContext } from "react";
import { NavigationMenu } from "../navigationMenu/NavigationMenu";
import { Button } from "../button/Button";
import { AuthContext } from "../../hooks/auth/AuthContext";
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
      <div className='headbar'>
        <NavLink to=''>
          <img src={logo} alt='PawPlay Logo' />
        </NavLink>
        <div className='header--nav-container'>
          <NavLink to='/create-event'>
            <Button className='primary'>Create event</Button>
          </NavLink>
          {user && loggedProfile ? (
            <NavLink
              to={`/profile/${loggedProfile.id}`}
              className='navigation-menu--button__sign-in'
            >
              <div className='navigation-menu--profile-image'>
                <img
                  src={
                    loggedProfile.profilePhoto
                      ? loggedProfile.profilePhoto
                      : profileUserImg
                  }
                  alt='Profile Icon'
                />
              </div>
            </NavLink>
          ) : (
            <NavLink to='signup' className='navigation-menu--button__sign-in'>
              Sign Up
            </NavLink>
          )}
          <button className='navigation-menu--button'>
            <img src={menu} alt='Menu Icon' onClick={handleNavMenuDisplay} />
          </button>
        </div>
      </div>

      {navigationMenuDisplay && (
        <NavigationMenu onClick={handleNavMenuDisplay} />
      )}
    </>
  );
};
