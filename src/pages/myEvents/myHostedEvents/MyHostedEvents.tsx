import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { EventData } from "../../../types";
import { EventCard } from "../../../components/eventCard/EventCard";
import { AuthContext } from "../../../auth/AuthContext";
import { getHostedEvents } from "../../../dataBase/services/readFunctions";
import "../MyEventPage.css";
import arrow from "../../../imgs/eventPage/arrow-left.svg";

export const MyHostedEvents = () => {
  const [hostedEvents, setHostedEvents] = useState<EventData[]>();
  const { loggedProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostedEvents = async () => {
      const hostedEventsSnap = await getHostedEvents(loggedProfile.id);
      setHostedEvents(hostedEventsSnap);
    };
    fetchHostedEvents();
  }, [loggedProfile]);

  return (
    <>
      <div className="my-events-page">
        <img
          src={arrow}
          alt="Return Icon"
          className="my-events-page__back-icon"
          onClick={() => navigate(-1)}
        />
        <h1 className="my-events-page__title">My hosted events</h1>
        <div className="my-events-page__events-container">
          {hostedEvents &&
            hostedEvents.map((eventData) => {
              return <EventCard key={eventData.id} event={eventData} />;
            })}
        </div>
      </div>
    </>
  );
};
