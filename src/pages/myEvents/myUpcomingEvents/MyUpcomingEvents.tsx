import { useState, useEffect, useContext } from "react";
import { EventData } from "../../../types";
import { EventCard } from "../../../components/eventCard/EventCard";
import { AuthContext } from "../../../auth/AuthContext";
import { getUpcomingEvents } from "../../../dataBase/services/servicesFunctions";
import "../MyEventPage.css";
import arrow from "../../../imgs/eventPage/arrow-left.svg";

export const MyUpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventData[]>();
  const { loggedProfile } = useContext(AuthContext);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const upcomingEventsSnap = await getUpcomingEvents(loggedProfile.id);
      setUpcomingEvents(upcomingEventsSnap);
    };
    fetchUpcomingEvents();
  }, [loggedProfile]);

  return (
    <>
      <div className="my-events-page">
        <img
          src={arrow}
          alt="Return Icon"
          className="my-events-page__back-icon"
        />
        <h1 className="my-events-page__title">My upcoming events</h1>
        <div className="my-events-page__events-container">
          {upcomingEvents &&
            upcomingEvents.map((eventData) => {
              return <EventCard key={eventData.id} event={eventData} />;
            })}
        </div>
      </div>
    </>
  );
};
