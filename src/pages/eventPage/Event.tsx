import { useNavigate, useParams } from "react-router";
import { EventCategory } from "../../components/eventCategory/EventCategory";
import { ProfileCard } from "../../components/profileCard/ProfileCard";
import { EventCard } from "../../components/eventCard/EventCard";
import { Accordion } from "../../components/accordion/Accordion";
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
import { db } from "../../dataBase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../../auth/AuthContext";
import { useEffect, useState, useContext } from "react";
import "./Event.css";
import arrow from "../../imgs/eventPage/arrow-left.svg";
import share from "../../imgs/eventPage/share.svg";
import footprintBlack from "../../imgs/eventPage/footprint-dog.svg";
import parkImg from "../../imgs/centralPark.jpg";
import location from "../../imgs/eventPage/location.svg";
import tag from "../../imgs/eventPage/tag.svg";
import description from "../../imgs/profilePage/description.svg";
import time from "../../imgs/eventPage/time.svg";
import calendar from "../../imgs/eventPage/calendar.svg";
import dog from "../../imgs/eventPage/dog-side.svg";
import availability from "../../imgs/eventPage/availability.svg";
import { toast, ToastContainer, Slide } from "react-toastify";

export const Event = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [hasJoined, setHasJoined] = useState<boolean>();
  const [similarEvents, setSimilarEvents] = useState<EventData[]>([]);
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
      toast.success("You've successfully joined the event!");
    } else {
      await eventUnregister(loggedProfile.id, eventData.id);
      setHasJoined(false);
      toast.success("You've left the event.");
    }
  };

  const navigate = useNavigate();

  //Función para filtrar lo eventos similares
  useEffect(() => {
    if (!eventData) return;

    const fetchSimilarEvents = async () => {
      const allEvents = await getEvents();

      const filteredEvents = allEvents.filter((event) => {
        return (
          event.activity === eventData.activity && event.id !== eventData.id
        );
      });

      setSimilarEvents(filteredEvents);
    };

    fetchSimilarEvents();
  }, [eventData]);

  //Función para coger de firebase todos los eventos
  const getEvents = async () => {
    const eventsCol = collection(db, "events");
    const eventSnaphot = await getDocs(eventsCol);
    const eventList = eventSnaphot.docs.map((doc) => doc.data());
    const typedEvents: EventData[] = eventList.map((doc) => doc as EventData);
    return typedEvents;
  };

  // Falta volver a leer el evento una vez modificado el que te hayas apuntado
  // Falta comprobar que el perfil está completo para poder apuntarse

  if (!eventData) {
    return null;
  } else {
    return (
      <>
        <div className="event--header">
          <div className="btn--icon">
            <img src={arrow} alt="Return Icon" onClick={() => navigate(-1)} />
          </div>
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
        <div className="event--container">
          <div className="event--container__left">
            <h3 className="event--title">{eventData.eventTitle}</h3>

            <main className="event--container__categories">
              <EventCategory
                img={calendar}
                reference={{
                  title: "Day",
                  dbCategory: "dateTime",
                }}
                info={normalizeDate(eventData.dateTime.toDate())}
                editable=""
              />
              <EventCategory
                img={time}
                reference={{
                  title: "Start time",
                  dbCategory: "hour",
                }}
                info={normalizeTime(new Date(eventData.hour))}
                editable=""
              />
              <EventCategory
                img={location}
                reference={{
                  title: "Location",
                  dbCategory: "location",
                }}
                info={eventData.location}
                editable=""
              />
              <EventCategory
                img={tag}
                reference={{
                  title: "Activity",
                  dbCategory: "activity",
                }}
                info={eventData.activity}
                editable=""
              />
              <EventCategory
                img={dog}
                reference={{
                  title: "Allowed breeds",
                  dbCategory: "places",
                }}
                info={eventData.breeds}
                editable=""
              />
              <EventCategory
                img={availability}
                reference={{
                  title: "Availability",
                  dbCategory: "places",
                }}
                info={normalizePlaces(eventData.places)}
                editable=""
              />
              <EventCategory
                img={description}
                reference={{
                  title: "Description",
                  dbCategory: "eventDescription",
                }}
                info={eventData.eventDescription}
                editable=""
              />
            </main>
          </div>

          <aside className="event--container__sidebar">
            <h3 className="event--profile-title">Know your organisator</h3>
            <div className="profile-card">
              <ProfileCard eventId={eventData.profileIdCreator} />
            </div>
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
              <ToastContainer transition={Slide} />
            </div>
          </aside>
        </div>
        <div className="event--events-container">
          <Accordion
            text={"Similar Events"}
            defaultOpen={true}
            similarEvents={similarEvents}
          />
        </div>
        {/* Falta el mapa */}
        {/* Falta el apartado de Similar Events */}
      </>
    );
  }
};
