import { NavLink, useParams } from "react-router";
import { EventCategory } from "../eventCategory/EventCategory";
import { ProfileCard } from "../components/profileCard/ProfileCard";
import "./Event.css";
import arrow from "../imgs/arrow-left.svg";
import share from "../imgs/share.svg";
import footprintBlack from "../imgs/footprint-dog--black.svg";
import parkImg from "../imgs/centralPark.jpg";
import location from "../imgs/location.svg";
import tag from "../imgs/tag.svg";
import description from "../imgs/description.svg";
import time from "../imgs/time.svg";
import calendar from "../imgs/calendar.svg";
import dog from "../imgs/dog-side.svg";

export const Event = () => {
  const params = useParams();
  console.log(params);

  //Estaría bien hacer componente las características y que se recre a través de un map
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
      <h3 className="event--title">Golden Retrievers Meetup at Central Park</h3>
      <EventCategory
        img={location}
        title="Location"
        info="5th Avenue & E 97th St, New York, NY"
      />
      <EventCategory img={tag} title="Activity" info="Outdoors" />
      <EventCategory
        img={description}
        title="Description"
        info="Asasa dhsjb fkdn fnjfbdj fndhjds f dsjhfjbf,mhmnsofgf hgjfb gjbdn gn,fb nhjgnfbjg njfd gjd mg sgbdsbgf s gbdsgmf gnfndgfds gbfdsmn"
      />
      <EventCategory
        img={time}
        title="Start time and end time"
        info="5pm/6pm"
      />
      <EventCategory img={calendar} title="Day" info="11/04/2025" />
      <EventCategory img={dog} title="Maximum places" info="Unlimited" />
      {/* Falta el botón de apuntarse */}
      {/* Falta el mapa */}
      <h3 className="event--profile-title">Know your organisator</h3>
      <ProfileCard name="Flufy" rating={4.8} events={6} />
    </>
  );
};
