import { EventCard, CardData } from "../../components/eventCard/EventCard";
import "./MyEventPage.css";
import arrow from "../../imgs/arrow-left.svg";

export const MyEventsPage = () => {
  const exampleEventData: CardData = {
    id: 1,
    name: "Afternoon of games",
    date: "July 28",
    time: "4:00 PM",
    location: "Central Park, Play Area",
    activity: "Fetch, chase, socialising",
    rating: 4,
    breed: "All breeds welcome",
    size: "Medium to Large",
  };
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
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
        </div>
      </div>
    </>
  );
};
