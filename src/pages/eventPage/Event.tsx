import { NavLink, useParams } from "react-router";
import { EventCategory } from "../../components/eventCategory/EventCategory";
import { ProfileCard } from "../../components/profileCard/ProfileCard";
import { Button } from "../../components/button/Button";
import { CheckListProfile } from "../../components/checkListProfile/CheckListProfile";
import {
  getOneEvent,
  getOneProfile,
} from "../../dataBase/services/servicesFunctions";
import { EventData, ProfileData } from "../../types";
import {
  normalizeDate,
  normalizeTime,
  normalizePlaces,
} from "../../functions/Functions";
import { db } from "../../dataBase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
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
  const [eventData, setEventData] = useState<EventData>();
  const [profileData, setProfileData] = useState<ProfileData>();
  const [createdEventsByProfile, setCreatedEventsByProfile] =
    useState<EventData[]>();

  //Params para la url
  const { eventId } = useParams();
  const paramsStr: string = eventId ?? "";
  console.log(eventId);

  useEffect(() => {
    //Fetching Event info
    const fetchEvent = async () => {
      const eventSnap = await getOneEvent(paramsStr);

      if (!eventSnap.exists()) {
        console.error("El evento no existe con id:", paramsStr);
        return;
      }

      const typedEventSnap: EventData = eventSnap.data() as EventData;
      console.log("esto es el el objeto de BBDD", typedEventSnap);
      setEventData(typedEventSnap);
    };
    fetchEvent();
  }, [paramsStr]);
  console.log("esto es el useState", eventData);

  useEffect(() => {
    //Fetching Event info
    if (!eventData) return;

    const profileID: string = eventData?.profileIdCreator || "";

    //Fetching Profile Info
    const fecthProfile = async () => {
      const profileSnap = await getOneProfile(profileID);

      if (!profileSnap.exists()) {
        console.error("El perfil no existe con id:", profileID);
        return;
      }

      const typedProfileSnap: ProfileData = profileSnap.data() as ProfileData;
      console.log(typedProfileSnap);
      setProfileData(typedProfileSnap);
    };
    fecthProfile();

    //Fetching Events created by Profile
    const ref = collection(db, "events");
    const q = query(ref, where("profileIdCreator", "==", profileID));
    const fetchQuerySnap = async () => {
      const querySnap = await getDocs(q);
      const typedQuerySnap: EventData[] = querySnap.docs.map(
        (doc) => doc.data() as EventData
      );
      console.log(typedQuerySnap);
      setCreatedEventsByProfile(typedQuerySnap);
    };
    fetchQuerySnap();
  }, [eventData]);

  const handleEventData = (eventSnap) => {
    setEventData((prev) => ({ ...prev, ...eventSnap }));
  };

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
        <img
          src={eventData?.eventPhoto ? eventData.eventPhoto : parkImg}
          alt=""
        />
      </div>
      <h3 className="event--title">{eventData?.eventTitle}</h3>
      <div className="event--container">
        <main className="event--container__categories">
          <EventCategory
            img={location}
            title="Location"
            info={eventData?.location ? eventData?.location : "Not available"}
            editable=""
          />
          <EventCategory
            img={tag}
            title="Activity"
            info={eventData?.activity ? eventData?.activity : "Not available"}
            editable=""
          />
          <EventCategory
            img={description}
            title="Description"
            info={
              eventData?.eventDescription
                ? eventData?.eventDescription
                : "Not available"
            }
            editable=""
          />
          <EventCategory
            img={time}
            title="Start time"
            info={
              eventData?.dateTime
                ? normalizeTime(eventData?.dateTime.toDate())
                : "Not available"
            }
            editable=""
          />
          <EventCategory
            img={calendar}
            title="Day"
            info={
              eventData?.dateTime
                ? normalizeDate(eventData?.dateTime.toDate())
                : "Not available"
            }
            editable=""
          />
          <EventCategory
            img={dog}
            title="Maximum places"
            info={
              eventData?.places
                ? normalizePlaces(eventData?.places)
                : "Not available"
            }
            editable=""
          />
        </main>
        <aside className="event--container__sidebar">
          <h3 className="event--profile-title">Know your organisator</h3>
          <ProfileCard
            name={
              profileData?.profileName
                ? profileData?.profileName
                : "Not available"
            }
            rating={0}
            events={
              createdEventsByProfile?.length
                ? createdEventsByProfile?.length
                : 0
            }
          />
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
      <CheckListProfile />
    </>
  );
};
