import { NavLink, useLocation } from "react-router";
import { CheckListProfile } from "../checkListProfile/CheckListProfile";
import { AuthContext } from "../../auth/AuthContext";
import { useContext } from "react";
import instagram from "../../imgs/instagram.svg";
import xLogo from "../../imgs/twitter.svg";
import "./Footer.css";

export const Footer = () => {
  const { user, isProfileCompleted } = useContext(AuthContext);
  const location = useLocation();

  const pathname = useLocation().pathname;

  const excludedRoutesCheckListProfile = [
    "/create-profile",
    "/create/event",
    "/login",
    "/singup",
    "/contact",
  ];

  const checklistBottomPosition = ["/profile", "/about"];

  const shouldBeBottomPosition = checklistBottomPosition.some((route) =>
    pathname.startsWith(route)
  );

  const excludedRoutesFooter = ["/contact"];

  const shouldShowChecklist =
    user &&
    !isProfileCompleted &&
    !excludedRoutesCheckListProfile.includes(location.pathname);

  return (
    <>
      {shouldShowChecklist && (
        <CheckListProfile positionBottom={shouldBeBottomPosition} />
      )}
      <footer
        className={`footer ${
          excludedRoutesFooter.includes(location.pathname)
            ? "footer--no-margin"
            : ""
        }`}
      >
        <div className="footer__content">
          <h2 className="footer__title">PawPlay</h2>
          <div className="footer__links">
            <div className="footer__section">
              <h3 className="footer__section-title">Navigation</h3>
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
              <h3 className="footer__section-title">Your PawPlay</h3>
              <NavLink className="footer__link" to="/profile">
                My account
              </NavLink>
              <NavLink className="footer__link" to="/profile">
                My events
              </NavLink>
            </div>
            <div className="footer__section">
              <h3 className="footer__section-title">Follow us</h3>
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
        <div className="footer__legal-container">
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
        </div>
        <p className="footer__copyright">
          &copy; 2025, PawPlay. All rights reserved.
        </p>
      </div>
    </>
  );
};
