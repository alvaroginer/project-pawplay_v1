import { EventCategoryProps } from "../../types";
import "./EventCategory.css";

export const EventCategory = ({ img, title, info }: EventCategoryProps) => {
  return (
    <div className="event--category">
      <div className="event--category__img">
        <img src={img} alt="" />
      </div>
      <div className="event--category__text">
        <h4 className="category--text__title">{title}</h4>
        <p className="category--text__text">{info}</p>
      </div>
    </div>
  );
};
