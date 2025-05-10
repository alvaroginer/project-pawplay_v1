import { EventData } from "../../types";
import { normalizeTime, normalizeDate } from "../../functions/Functions";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { WarningModal } from "../modals/warningModal/WarningModal";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { useNavigate } from "react-router";
import "../../index.css";
import "./EventCard.css";
import park from "../../imgs/image-park.jpg";
import footprint from "../../imgs/eventCard/footprint-dog.svg";
import dots from "../../imgs/eventCard/dots.svg";
import bone from "../../imgs/profileCard/bone.svg";

// Ya se puede crear la función que calcula el rating

export const EventCard = ({ event }: { event: EventData }) => {
  //Destructuring props
  const { eventPhoto, eventTitle, dateTime, location, activity, id } = event;

  //useState and useContext variable declaration
  const [isWarningModal, setIsWarningModal] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const eventDateTime = dateTime.toDate();

  const handleEventCardClick = () => {
    if (user) {
      navigate(`/event/${id}`);
    } else {
      setIsWarningModal(!isWarningModal);
    }
  };

  return (
    <>
      {isWarningModal && !user && (
        <WarningModal
          modalText='Paws up! You need to log in before you can join the pack.'
          buttonText='Sign or Log in'
          onClose={handleEventCardClick}
        />
      )}
      <div
        className='event-card grid-cell margin--bt__24'
        onClick={handleEventCardClick}
      >
        <div className='event-card--image position-relative'>
          <img src={eventPhoto !== null ? eventPhoto : park} alt='Park' />
          <div className='fav-button--container'>
            <button className='fav-button'>
              <img src={footprint} alt='Dog Footprint' />
            </button>
            <button className='fav-button'>
              <img src={dots} alt='Dots Icon' />
            </button>
          </div>
        </div>
        <div className='event-card--bottom-section'>
          <div className='event-card--text'>
            <div className='display--flex gap__4'>
              <p className='event-card--text__date'>
                {normalizeDate(eventDateTime)}
              </p>
              <p className='event-card--text__date'>
                {normalizeTime(eventDateTime)}
              </p>
            </div>
            <h3 className='event-card--text__title'>{eventTitle}</h3>
            <p className='event-card--text__p--gray'>{location}</p>
          </div>
          <div className='event-card--footer'>
            <p className='event-card--text__tag'>
              {capitalizeFirstLetter(activity)}
            </p>
            <div className='event-card--rating'>
              <img src={bone} alt='Bone Icon' />
              <p>4</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
