import { useNavigate, useParams } from "react-router";
import { EventSignup } from "./EventSignup";
import { EventUnregister } from "./EventUnregister";
import { InfoCategoryEvent } from "../../components/infoCategoryEvent/InfoCategoryEvent";
import { ProfileCard } from "../../components/profileCard/ProfileCard";
import { Accordion } from "../../components/accordion/Accordion";
import { getOneEvent } from "../../dataBase/services/readFunctions";
import { EventData } from "../../types";
import {
  normalizeDate,
  normalizeTime,
  normalizePlaces,
} from "../../functions/Functions";
import { ProfileData } from "../../types";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { getProfilesFromUser } from "../../dataBase/services/readFunctions";
import { getSimilarEventsLimited } from "../../dataBase/services/readFunctions";
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

export const Event = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  //const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [similarEvents, setSimilarEvents] = useState<EventData[]>([]);

  // Estado para guardar los perfiles encontrados
  const [profiles, setProfiles] = useState<ProfileData[]>([]);

  const { user, loggedProfile } = useContext(AuthContext);

  //Params para la url
  const { eventId } = useParams();
  const paramsStr: string = eventId ?? "";

  useEffect(() => {
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

  const navigate = useNavigate();

  //Efecto que se ejecuta para encontrar los perfiles del user
  useEffect(() => {
    if (!user) {
      // Si no hay usuario logueado, salimos del efecto
      console.error("No user is logged in");
      return;
    }

    // Función asíncrona para obtener los perfiles del usuario logueado
    const fetchProfiles = async () => {
      const profilesFromDb = await getProfilesFromUser(user.uid);

      if (!profilesFromDb) return;

      setProfiles(profilesFromDb); // Guardamos los perfiles en el estado
    };

    // Llamamos a la función para obtener los perfiles
    fetchProfiles();
  }, [user]);

  useEffect(() => {
    const fetchSimilarEvents = async () => {
      if (!eventData) return;

      const similarEventsDb = await getSimilarEventsLimited(eventData.activity);

      if (!similarEventsDb) return;

      setSimilarEvents(similarEventsDb);
    };

    fetchSimilarEvents();
  }, [eventData]);

  // Falta comprobar que el perfil está completo para poder apuntarse
  console.log(eventData);
  console.log(loggedProfile);

  if (!eventData || !loggedProfile) {
    return null;
  }

  const hasJoined = eventData.profileIdAsisstant?.includes(loggedProfile.id);

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
        <div className="event--info">
          <h3 className="event--title">{eventData.eventTitle}</h3>
          <main className="event--container__categories">
            <InfoCategoryEvent
              img={calendar}
              reference={{
                title: "Day",
                dbCategory: "dateTime",
              }}
              info={normalizeDate(eventData.dateTime.toDate())}
              editable=""
            />
            <InfoCategoryEvent
              img={time}
              reference={{
                title: "Start time",
                dbCategory: "dateTime",
              }}
              info={normalizeTime(eventData.dateTime.toDate())}
              editable=""
            />
            <InfoCategoryEvent
              img={location}
              reference={{
                title: "Location",
                dbCategory: "location",
              }}
              info={eventData.location}
              editable=""
            />
            <InfoCategoryEvent
              img={tag}
              reference={{
                title: "Activity",
                dbCategory: "activity",
              }}
              info={eventData.activity}
              editable=""
            />
            <InfoCategoryEvent
              img={dog}
              reference={{
                title: "Allowed breeds",
                dbCategory: "breeds",
              }}
              info={normalizePlaces(eventData.places)}
              editable=""
            />
            <InfoCategoryEvent
              img={availability}
              reference={{
                title: "Availability",
                dbCategory: "profileIdAsisstant",
              }}
              info={normalizePlaces(eventData.places)}
              editable=""
            />
            <InfoCategoryEvent
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
              <EventUnregister eventData={eventData} profiles={profiles} />
            ) : (
              <EventSignup eventData={eventData} profiles={profiles} />
            )}
          </div>
        </aside>
      </div>

      <div className="event--events-container">
        <Accordion
          text={"Similar Events"}
          profileId=""
          defaultOpen={true}
          eventsData={similarEvents}
        />
      </div>

      {/* Falta el mapa */}
    </>
  );
};
