import "./ViewMoreCard.css";
import arrow from "../../imgs/arrow-right.svg";

export const ViewMoreCard = () => {
  return (
    <>
      <div className="view-all-card">
        <p className="view-all-card__text">View all</p>
        <img className="view-all-card__icon" src={arrow} alt="" />
      </div>
    </>
  );
};
