//import { Rating } from "../rating/Rating";
import "../../index.css";
import "./card.css";

interface CardProps {
  // id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  type: string;
  // rating: number;
}

export const Card = (props: CardProps) => {
  const { name, date, time, location, type } = props;

  return (
    <div className="event-card grid-cell margin--bt__24">
      <div className="event-card--image position-relative">
        <img src="imgs/image-park.jpg" alt="Park" />
        <div className="fav-button--container">
          <button className="fav-button">
            <img src="imgs/footprint-dog.svg" alt="Dog Footprint" />
          </button>
          <button className="fav-button">
            <img src="imgs/dots.svg" alt="Dog Footprint" />
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
        <p className="event-card--text__p">{type}</p>
      </div>
      {/* <Rating keys={id + 1} rating={rating} /> */}
    </div>
  );
};
