import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router';
import { AuthContext } from '../../auth/AuthContext';
import instagram from '../../imgs/instagram.svg';
import xLogo from '../../imgs/twitter.svg';
import { CheckListProfile } from '../checkListProfile/CheckListProfile';
import './Footer.css';

export const Footer = () => {
  const { user, isProfileCompleted } = useContext(AuthContext);
  const location = useLocation();

  const excludedRoutes = [
    '/create-profile',
    '/create/event',
    '/login',
    '/singup',
    '/contact'
  ];
  const shouldShowChecklist =
    user && !isProfileCompleted && !excludedRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowChecklist && <CheckListProfile />}
      <footer className="footer">
        <h2 className="footer__title">PawPlay</h2>
        <div className="footer__links">
          <div className="footer__links__nav">
            <h5 className="footer__links__title">Navigation</h5>
            <NavLink className="footer__links__link" to="">
              Home
            </NavLink>
            <NavLink className="footer__links__link" to="/aboutUs">
              About us
            </NavLink>
            <NavLink className="footer__links__link" to="/contactUs">
              Contact us
            </NavLink>
          </div>
          <div className="footer__links__profile">
            <h5 className="footer__links__title">Your PawPlay</h5>
            <NavLink className="footer__links__link" to="/profile">
              My account
            </NavLink>
            <NavLink className="footer__links__link" to="/profile">
              My events
            </NavLink>
          </div>
          <div className="footer__links__rrss">
            <h5 className="footer__links__title">Follow us</h5>
            <a href="" target="_blank" className="footer__links__link">
              <img src={instagram} alt="Instagram Icon" />
            </a>
            <a href="" target="_blank" className="footer__links__link">
              <img src={xLogo} alt="X Icon" />
            </a>
          </div>
        </div>
        <div className="footer__legal-container">
          <div className="footer__legal-container__container">
            <NavLink className="footer__legal-container__link" to="/privacy">
              Privacy policy
            </NavLink>
            <NavLink className="footer__legal-container__link" to="/service">
              Terms of service
            </NavLink>
            <NavLink className="footer__legal-container__link" to="/cookies">
              Cookies
            </NavLink>
          </div>
          <p className="footer__text">
            &copy; 2025, PawPlay. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};
