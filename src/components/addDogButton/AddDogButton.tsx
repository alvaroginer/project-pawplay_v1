import { Link } from "react-router";
import plus from "../../imgs/plus.svg";
import "./AddDogButton.css";

export const AddDogButton = () => {
  return (
    <>
      <Link to='/create-profile'>
        <div className='add-dog-card'>
          <p className='add-dog-card__text'>Add dog</p>
          <img className='add-dog-card__icon' src={plus} alt='' />
        </div>
      </Link>
    </>
  );
};
