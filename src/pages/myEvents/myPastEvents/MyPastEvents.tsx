import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { EventData } from "../../../types";
import { EventCard } from "../../../components/eventCard/EventCard";
import { AuthContext } from "../../../hooks/auth/AuthContext";
import { getPastEvents } from "../../../dataBase/services/readFunctions";
import "../MyEventPage.css";
import arrow from "../../../imgs/eventPage/arrow-left.svg";

export const MyPastEvents = () => {
  const [pastEvents, setPastEvents] = useState<EventData[]>();
  const { loggedProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedProfile) return;
    const fetchPastEvents = async () => {
      const pastEventsSnap = await getPastEvents(loggedProfile.id);
      setPastEvents(pastEventsSnap);
    };
    fetchPastEvents();
  }, [loggedProfile]);

  return (
    <>
      <div className='my-events-page'>
        <img
          src={arrow}
          alt='Return Icon'
          className='my-events-page__back-icon'
          onClick={() => navigate(-1)}
        />
        <h1 className='my-events-page__title'>My past events</h1>
        <div className='my-events-page__events-container'>
          {pastEvents &&
            pastEvents.map((eventData) => {
              return <EventCard key={eventData.id} event={eventData} />;
            })}
        </div>
      </div>
    </>
  );
};
