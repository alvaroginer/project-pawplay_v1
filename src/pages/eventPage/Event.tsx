import { NavLink, useParams } from "react-router";
import { EventCategory } from "../../components/eventCategory/EventCategory";
import { ProfileCard } from "../../components/profileCard/ProfileCard";
import { Button } from "../../components/button/Button";

import { getOneEvent } from "../../dataBase/services/readFunctions";
import { EventData } from "../../types";
import {
  normalizeDate,
  normalizeTime,
  normalizePlaces,
} from "../../functions/Functions";
import {
  eventSignUp,
  eventUnregister,
} from "../../dataBase/services/updateFunctions";
import { AuthContext } from "../../auth/AuthContext";
import { useEffect, useState, useContext } from "react";
import "./Event.css";
import arrow from "../../imgs/eventPage/arrow-left.svg";
import share from "../../imgs/eventPage/share.svg";
import footprintBlack from "../../imgs/eventPage/footprint-dog.svg";
import parkImg from "../../imgs/centralPark.jpg";
import location from "../../imgs/eventPage/location.svg";
import tag from "../../imgs/eventPage/tag.svg";
import description from "../../imgs/eventPage/description.svg";
import time from "../../imgs/eventPage/time.svg";
import calendar from "../../imgs/eventPage/calendar.svg";
import dog from "../../imgs/eventPage/dog-side.svg";

export const Event = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [hasJoined, setHasJoined] = useState<boolean>();
  const { loggedProfile } = useContext(AuthContext);

  //Params para la url
  const { eventId } = useParams();
  const paramsStr: string = eventId ?? "";

  useEffect(() => {
    //Fetching Event info
    const fetchEvent = async () => {
      const eventSnap = await getOneEvent(paramsStr);

      if (eventSnap === null) {
        setEventData(null);
        return;
      }

      setEventData(eventSnap);
    };
    fetchEvent();
  }, [paramsStr]);

  const handleHasJoined = async () => {
    if (eventData === null) return;

    if (!hasJoined) {
      await eventSignUp(loggedProfile.id, eventData.id);
      setHasJoined(true);
    } else {
      await eventUnregister(loggedProfile.id, eventData.id);
      setHasJoined(false);
    }
  };

  // Falta volver a leer el evento una vez modificado el que te hayas apuntado
  // Falta comprobar que el perfil está completo para poder apuntarse

  if (!eventData) {
    return null;
  } else {
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
          <img
            src={eventData.eventPhoto ? eventData.eventPhoto : parkImg}
            alt=""
          />
        </div>
        <h3 className="event--title">{eventData.eventTitle}</h3>
        <div className="event--container">
          <main className="event--container__categories">
            <EventCategory
              img={location}
              title="Location"
              info={eventData.location}
              editable=""
            />
            <EventCategory
              img={tag}
              title="Activity"
              info={eventData.activity}
              editable=""
            />
            <EventCategory
              img={description}
              title="Description"
              info={eventData.eventDescription}
              editable=""
            />
            <EventCategory
              img={time}
              title="Start time"
              info={normalizeTime(eventData.dateTime.toDate())}
              editable=""
            />
            <EventCategory
              img={calendar}
              title="Day"
              info={normalizeDate(eventData.dateTime.toDate())}
              editable=""
            />
            <EventCategory
              img={dog}
              title="Maximum places"
              info={normalizePlaces(eventData.places)}
              editable=""
            />
          </main>
          <aside className="event--container__sidebar">
            <h3 className="event--profile-title">Know your organisator</h3>
            <ProfileCard eventId={eventData.profileIdCreator} />
            <div className="event--modal">
              {hasJoined ? (
                <Button onClick={handleHasJoined} className="terciary">
                  Cancel assistance
                </Button>
              ) : (
                <Button onClick={handleHasJoined} className="primary">
                  Join Us
                </Button>
              )}
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
  }
};
