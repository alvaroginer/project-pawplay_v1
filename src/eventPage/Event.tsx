import { NavLink, useParams } from "react-router";
import { EventCategory } from "../eventCategory/EventCategory";
import { ProfileCard } from "../components/profileCard/ProfileCard";
import { Button } from "../components/button/Button";
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

  //Crear función que cree un array con 5 objetos de eventos
  //que tengan la misma carcaterística de "activity" que el
  //del event mostrado, a lo mejor la vraible que los contiene debe ser un useState

  //Crear un bucle for(let i = 0; i < 5; i++) y dentro del objeto
  //events hacer un find de algún evento que sea del miso tipo y
  //no esté dentro del array de similar events

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
      <div className="event--container">
        <main className="event--container__categories">
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
        </main>
        <aside className="event--container__sidebar">
          <h3 className="event--profile-title">Know your organisator</h3>
          <ProfileCard name="Flufy" rating={4.8} events={6} />
          <div className="event--modal">
            <Button className="primary">Join Us</Button>
          </div>
        </aside>
      </div>
      <div className="event--events-container">
        <h3 className="event--profile-title">Similar Events</h3>
      </div>
      {/* Falta el mapa */}
      {/* Falta el apartado de Similar Events */}
    </>
  );
};
