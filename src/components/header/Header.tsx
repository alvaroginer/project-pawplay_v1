import { NavLink } from "react-router";
import { useState, useContext } from "react";
import { NavigationMenu } from "../navigationMenu/NavigationMenu";
import { AuthContext } from "../../hooks/auth/AuthContext";
import { CreateEventButton } from "../button/CreateEventButton";
import "../../index.css";
import "./Header.css";
import logo from "../../imgs/Logo-black.svg";
import menu from "../../imgs/menu.svg";
import profileUserImg from "../../imgs/account-circle.svg";

export const Header = () => {
  const [navigationMenuDisplay, setNavigationMenuDisplay] =
    useState<boolean>(false);

  const { user, loggedProfile, setIsWarningModal, isWarningModal } =
    useContext(AuthContext);

  const handleNavMenuDisplay = () => {
    if (!loggedProfile) {
      setIsWarningModal({
        ...isWarningModal,
        warningSignUp: true,
      });
    }
    setNavigationMenuDisplay(!navigationMenuDisplay);
  };

  console.log(navigationMenuDisplay);
  return (
    <>
      <div className='headbar'>
        <NavLink to=''>
          <img src={logo} alt='PawPlay Logo' />
        </NavLink>
        <div className='header--nav-container'>
          <CreateEventButton />
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
          <button
            className='navigation-menu--button'
            onClick={handleNavMenuDisplay}
          >
            <img src={menu} alt='Menu Icon' />
          </button>
        </div>
      </div>
      {navigationMenuDisplay && (
        <NavigationMenu onClick={handleNavMenuDisplay} />
      )}
    </>
  );
};
