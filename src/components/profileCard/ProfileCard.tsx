import "./ProfileCard.css";
import dogUser from "../../imgs/dogUser.jpg";
import bone from "../../imgs/bone.svg";

interface ProfileCardProps {
  name: string;
  rating: number;
  events: number;
  img?: string;
}

export const ProfileCard = ({
  name,
  rating,
  events,
  img,
}: ProfileCardProps) => {
  return (
    <div className="profile--card">
      <div className="profile--card__image-container">
        <img
          className="profile--card__image"
          src={img ? img : dogUser}
          alt="Profile Image"
        />
      </div>
      <div className="profile--card__info">
        <p className="profile--card__name">{name}</p>

        <div className="profile--card__block-rating">
          <div className="profile--card__rating">
            <img className="profile--card__icon" src={bone} alt="" />
            <p className="profile--card__value">{rating}</p>
          </div>
          <p className="profile--card__label">Rating</p>
        </div>

        <div className="profile--card__block-events">
          <p className="profile--card__value">{events}</p>
          <p className="profile--card__label">Events created</p>
        </div>
      </div>
    </div>
  );
};
