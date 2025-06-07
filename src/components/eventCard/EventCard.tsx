import { EventData } from "../../types";
import {
  normalizeTime,
  normalizeDate,
  randomRating,
} from "../../functions/Functions";
import { useContext } from "react";
import { useEventCardClick } from "../../hooks/useEventCardClick";
import { AuthContext } from "../../hooks/auth/AuthContext";
import { WarningModal } from "../modals/warningModal/WarningModal";
import { DeleteEventWarningModal } from "../modals/deleteEventWarningModal/DeleteEventWarningModal";
import { EventDostMenu } from "../dotsMenu/eventDotsMenu/EventDotsMenu";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { LikeIcon } from "../../icons/likeIcon/LikeIcon";
import "../../index.css";
import "./EventCard.css";
import park from "../../imgs/image-park.jpg";
import bone from "../../imgs/profileCard/bone.svg";

export const EventCard = ({ event }: { event: EventData }) => {
  //Destructuring props
  const {
    eventPhoto,
    eventTitle,
    dateTime,
    location,
    activity,
    id,
    profileIdCreator,
    profileIdAsisstant,
  } = event;

  //useState and useContext variable declaration
  const { handleEventCardClick, handleLike } = useEventCardClick();
  const { loggedProfile, setIsWarningModal, isWarningModal } =
    useContext(AuthContext);
  const eventDateTime = dateTime.toDate();
  const hasLike = loggedProfile && loggedProfile?.likedEvents.includes(id);

  return (
    <>
      {isWarningModal.warningSignUp && (
        <WarningModal
          modalText='Paws up! You need to log in before you can join the pack.'
          buttonText='Sign or Log in'
          onClose={() => handleEventCardClick(id)}
        />
      )}
      {isWarningModal.warningDelete && <DeleteEventWarningModal id={id} />}
      <div
        className='event-card grid-cell margin--bt__24'
        onClick={() => handleEventCardClick(id)}
      >
        <div className='event-card--image position-relative'>
          <img src={eventPhoto !== null ? eventPhoto : park} alt='Park' />
          <div className='fav-button--container'>
            <button
              className='fav-button'
              onClick={
                loggedProfile && hasLike
                  ? (e) => {
                      e.stopPropagation();
                      handleLike(hasLike, id);
                    }
                  : () =>
                      setIsWarningModal({
                        ...isWarningModal,
                        warningSignUp: true,
                      })
              }
            >
              <LikeIcon
                className={
                  hasLike ? "event-card--like--active" : "event-card--like"
                }
              />
            </button>
            {loggedProfile?.id === profileIdCreator && profileIdAsisstant && (
              <EventDostMenu profileIdAsisstant={profileIdAsisstant} />
            )}
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
              <p>{randomRating()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
