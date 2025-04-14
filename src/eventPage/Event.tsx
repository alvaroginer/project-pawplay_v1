import { NavLink, useParams } from "react-router";
import "./Event.css";
import arrow from "../imgs/arrow-left.svg";
import share from "../imgs/share.svg";
import footprintBlack from "../imgs/footprint-dog--black.svg";
import parkImg from "../imgs/centralPark.jpg";

export const Event = () => {
  const params = useParams();
  console.log(params);
  return (
    <>
      <div className="event--header">
        <NavLink to="" className="btn--icon">
          <img src={arrow} alt="Return Icon" />
        </NavLink>
        <div className="event--header__buttons">
          <button className="btn--icon margin--right__10">
            <img src={share} alt="Share Icon" />
          </button>
          <button className="btn--icon">
            <img src={footprintBlack} alt="Paw-Like Icon" />
          </button>
        </div>
      </div>
      <div className="event--img-container">
        <img src={parkImg} alt="" />
      </div>
    </>
  );
};
