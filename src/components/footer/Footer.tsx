import { NavLink } from "react-router";
import instagram from "../../imgs/instagram.svg";
import xLogo from "../../imgs/twitter.svg";
import "./Footer.css";

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__content">
          <h2 className="footer__title">PawPlay</h2>
          <div className="footer__links">
            <div className="footer__section">
              <h5 className="footer__section-title">Navigation</h5>
              <NavLink className="footer__link" to="">
                Home
              </NavLink>
              <NavLink className="footer__link" to="/aboutUs">
                About us
              </NavLink>
              <NavLink className="footer__link" to="/contactUs">
                Contact us
              </NavLink>
            </div>
            <div className="footer__section">
              <h5 className="footer__section-title">Your PawPlay</h5>
              <NavLink className="footer__link" to="/profile">
                My account
              </NavLink>
              <NavLink className="footer__link" to="/profile">
                My events
              </NavLink>
            </div>
            <div className="footer__section">
              <h5 className="footer__section-title">Follow us</h5>
              <a href="" target="_blank" className="footer__link">
                <img src={instagram} alt="Instagram Icon" />
              </a>
              <a href="" target="_blank" className="footer__link">
                <img src={xLogo} alt="X Icon" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer__legal">
        <div className="footer__legal-links">
          <NavLink className="footer__legal-link" to="/privacy">
            Privacy policy
          </NavLink>
          <NavLink className="footer__legal-link" to="/service">
            Terms of service
          </NavLink>
          <NavLink className="footer__legal-link" to="/cookies">
            Cookies
          </NavLink>
        </div>
        <p className="footer__copyright">
          &copy; 2025, PawPlay. All rights reserved.
        </p>
      </div>
    </>
  );
};
