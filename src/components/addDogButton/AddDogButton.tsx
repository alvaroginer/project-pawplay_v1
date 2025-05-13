import plus from "../../imgs/plus.svg";
import "./AddDogButton.css";

export const AddDogButton = () => {
  return (
    <>
      <div className="add-dog-card">
        <p className="add-dog-card__text">Add dog</p>
        <img className="add-dog-card__icon" src={plus} alt="" />
      </div>
    </>
  );
};
