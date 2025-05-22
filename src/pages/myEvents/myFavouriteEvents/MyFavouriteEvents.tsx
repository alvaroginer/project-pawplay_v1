import { useState, useEffect, useContext } from "react";
import { EventData } from "../../../types";
import { EventCard } from "../../../components/eventCard/EventCard";
import { AuthContext } from "../../../auth/AuthContext";
import { getFavouriteEvents } from "../../../dataBase/services/readFunctions";
import "../MyEventPage.css";
import arrow from "../../../imgs/eventPage/arrow-left.svg";

export const MyFavouriteEvents = () => {
  const [favouriteEvents, setFavouriteEvents] = useState<EventData[]>();
  const { loggedProfile } = useContext(AuthContext);

  useEffect(() => {
    if (!loggedProfile) return;
    const fetchFavouriteEvents = async () => {
      const favouriteEventsSnap = await getFavouriteEvents(
        loggedProfile.likedEvents
      );
      setFavouriteEvents(favouriteEventsSnap);
    };
    fetchFavouriteEvents();
  }, [loggedProfile]);

  return (
    <>
      <div className='my-events-page'>
        <img
          src={arrow}
          alt='Return Icon'
          className='my-events-page__back-icon'
        />
        <h1 className='my-events-page__title'>My favourite events</h1>
        <div className='my-events-page__events-container'>
          {favouriteEvents &&
            favouriteEvents.map((eventData) => {
              return <EventCard key={eventData.id} event={eventData} />;
            })}
        </div>
      </div>
    </>
  );
};
