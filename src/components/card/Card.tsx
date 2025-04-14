import { Rating } from "../rating/Rating";
import "../../index.css";
import "./card.css";
import park from "../../imgs/image-park.jpg";
import footprint from "../../imgs/footprint-dog.svg";
import dots from "../../imgs/dots.svg";

export interface CardData {
  id?: number;
  name: string;
  date: string;
  time: string;
  location: string;
  activity: string;
  rating: number;
  breed: string;
  size: string;
}

export const Card = (props: { event: CardData }) => {
  const { event } = props;
  const { name, date, time, location, activity, rating } = event;

  return (
    <div className="event-card grid-cell margin--bt__24">
      <div className="event-card--image position-relative">
        <img src={park} alt="Park" />
        <div className="fav-button--container">
          <button className="fav-button">
            <img src={footprint} alt="Dog Footprint" />
          </button>
          <button className="fav-button">
            <img src={dots} alt="Dots Icon" />
          </button>
        </div>
      </div>
      <div className="event-card--text">
        <h3 className="event-card--text__title">{name}</h3>
        <div className="display--flex gap__4">
          <p className="event-card--text__p">{date}</p>
          <p className="event-card--text__p">{time}</p>
        </div>
        <p className="event-card--text__p">{location}</p>
        <p className="event-card--text__p">{activity}</p>
      </div>
      {<Rating rating={rating} />}
    </div>
  );
};
