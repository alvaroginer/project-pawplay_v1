import { NavLink } from "react-router";
import instagram from "../../imgs/instagram.svg";
import xLogo from "../../imgs/twitter.svg";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer--title">PawPlay</h2>
      <div className="footer--links-container">
        <div className="footer--links-container__nav">
          <h5 className="footer--links-container__title">Navigation</h5>
          <NavLink className="footer--links-container__link" to="">
            Home
          </NavLink>
          <NavLink className="footer--links-container__link" to="/aboutUs">
            About us
          </NavLink>
          <NavLink className="footer--links-container__link" to="/contactUs">
            Contact us
          </NavLink>
        </div>
        <div className="footer--links-container__profile">
          <h5 className="footer--links-container__title">Your PawPlay</h5>
          <NavLink className="footer--links-container__link" to="/profile">
            My account
          </NavLink>
          <NavLink className="footer--links-container__link" to="/profile">
            My events
          </NavLink>
        </div>
        <div className="footer--links-container__rrss">
          <h5 className="footer--links-container__title">Follow us</h5>
          <a href="" target="_blank" className="footer--links-container__link">
            <img src={instagram} alt="Instagram Icon" />
          </a>
          <a href="" target="_blank" className="footer--links-container__link">
            <img src={xLogo} alt="X Icon" />
          </a>
        </div>
      </div>
      <div className="footer--legal-container">
        <div className="footer--legal-container__container">
          <NavLink className="footer--legal-container__link" to="/privacy">
            Privacy policy
          </NavLink>
          <NavLink className="footer--legal-container__link" to="/service">
            Terms of service
          </NavLink>
          <NavLink className="footer--legal-container__link" to="/cookies">
            Cookies
          </NavLink>
        </div>
        <p className="footer--text">
          &copy; 2025, PawPlay. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
