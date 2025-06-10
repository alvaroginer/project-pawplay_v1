import { useNavigate, useParams } from "react-router";
import { EventSignup } from "./EventSignup";
import { EventUnregister } from "./EventUnregister";
import { ProfileCard } from "../../components/profileCard/ProfileCard";
import { Accordion } from "../../components/accordion/Accordion";
import { getOneEvent } from "../../dataBase/services/readFunctions";
import { EventData } from "../../types";
import { ProfileData } from "../../types";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../hooks/auth/AuthContext";
import { getProfilesFromUser } from "../../dataBase/services/readFunctions";
import { getSimilarEventsLimited } from "../../dataBase/services/readFunctions";
import { InfoCategorySkeleton } from "../../components/skeletons/infoCategorySkeleton/InfoCategorySkeleton";
import { EventCategories } from "./EventCategories";
import { EventImageSkeleton } from "../../components/skeletons/imageSkeletons/EventImageSkeleton";
import { MapComponent } from "../../components/mapComponent/MapComponent";
import "./Event.css";
import arrow from "../../imgs/eventPage/arrow-left.svg";
import share from "../../imgs/eventPage/share.svg";
import footprintBlack from "../../imgs/eventPage/footprint-dog.svg";
import parkImg from "../../imgs/centralPark.jpg";

export const Event = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [similarEvents, setSimilarEvents] = useState<EventData[]>([]);
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user, loggedProfile } = useContext(AuthContext);

  //Params para la url
  const { eventId } = useParams();
  const paramsStr: string = eventId ?? "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventSnap = await getOneEvent(paramsStr);
      if (eventSnap === null) {
        setEventData(null);
        return;
      }
      setEventData(eventSnap);
      setIsLoading(false);
    };
    fetchEvent();

    // Función asíncrona para obtener los perfiles del usuario logueado
    const fetchProfiles = async () => {
      if (!user) {
        console.error("No user is logged in");
        return;
      }
      const profilesFromDb = await getProfilesFromUser(user.uid);

      if (!profilesFromDb) return;

      setProfiles(profilesFromDb);
    };
    fetchProfiles();
  }, [paramsStr, user]);

  useEffect(() => {
    const fetchSimilarEvents = async () => {
      if (!eventData) return;
      if (!loggedProfile) return;

      const similarEventsDb = await getSimilarEventsLimited(
        eventData.activity,
        loggedProfile?.id
      );

      if (!similarEventsDb) return;

      setSimilarEvents(similarEventsDb);
    };
    fetchSimilarEvents();
  }, [eventData, loggedProfile]);

  // Falta comprobar que el perfil está completo para poder apuntarse

  if (!loggedProfile) {
    return null;
  }

  const hasJoined = eventData?.profileIdAsisstant?.includes(loggedProfile.id);

  return (
    <>
      <div className='event--header'>
        <div className='btn--icon'>
          <img src={arrow} alt='Return Icon' onClick={() => navigate(-1)} />
        </div>
        <div className='event--header__buttons'>
          <button className='btn--icon margin--right__10'>
            <img src={share} alt='Share Icon' />
          </button>
          <button className='btn--icon'>
            <img src={footprintBlack} alt='Paw-Like Icon' />
          </button>
        </div>
      </div>
      {isLoading ? (
        <EventImageSkeleton />
      ) : (
        <div className='event--img-container'>
          <img
            src={eventData?.eventPhoto ? eventData.eventPhoto : parkImg}
            alt=''
          />
        </div>
      )}
      <div className='event--container'>
        <div className='event--info'>
          <h3 className='event--title'>{eventData?.eventTitle}</h3>
          <main className='event--container__categories'>
            {isLoading &&
              !eventData &&
              Array.from({ length: 7 }).map((_, i) => (
                <InfoCategorySkeleton key={i} />
              ))}

            {!isLoading && eventData && (
              <EventCategories
                dateTime={eventData.dateTime}
                location={eventData.location.address}
                activity={eventData.activity}
                breeds={eventData.breeds}
                places={eventData.places}
                eventDescription={eventData.eventDescription}
              />
            )}
          </main>
        </div>
        <aside className='event--container__sidebar'>
          <h3 className='event--profile-title'>Know your organisator</h3>
          <div className='profile-card'>
            {eventData && <ProfileCard eventId={eventData.profileIdCreator} />}
          </div>
          <div className='event--modal'>
            {hasJoined ? (
              <EventUnregister eventData={eventData} profiles={profiles} />
            ) : (
              <EventSignup eventData={eventData} profiles={profiles} />
            )}
          </div>
        </aside>
      </div>
      {eventData?.location.coordinates && (
        <MapComponent eventLocation={eventData.location.coordinates} />
      )}
      <div className='event--events-container'>
        <Accordion
          text={"Similar Events"}
          profileId=''
          defaultOpen={true}
          eventsData={similarEvents}
        />
      </div>
      {/* Falta el mapa */}
    </>
  );
};
