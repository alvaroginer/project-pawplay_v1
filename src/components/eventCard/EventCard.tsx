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
import { DotsMenu } from "../dotsMenu/DotsMenu";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { Button } from "../button/Button";
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
  const { handleEventCardClick, handleLike, handleDeleteEvent } =
    useEventCardClick();
  const { loggedProfile, setIsWarningModal, isWarningModal } =
    useContext(AuthContext);
  const eventDateTime = dateTime.toDate();
  const hasLike = loggedProfile && loggedProfile?.likedEvents.includes(id);

  const handleModalWarning = () => {
    if (isWarningModal.warningSignUp) {
      return (
        <WarningModal
          modalText="Paws up! You need to log in before you can join the pack."
          buttonText="Sign or Log in"
          onClose={() => handleEventCardClick(id)}
        />
      );
    }

    if (isWarningModal.warningDelete) {
      return (
        <WarningModal
          modalText="Are you sure you want to  delete this event?"
          onClose={() => handleEventCardClick(id)}
        >
          <div className="display--flex space--around gap__4">
            <Button className="primary" onClick={handleDeleteEvent}>
              Yes
            </Button>
            <Button
              className="primary--outlined"
              onClick={() =>
                setIsWarningModal({
                  ...isWarningModal,
                  warningDelete: false,
                })
              }
            >
              No
            </Button>
          </div>
        </WarningModal>
      );
    }
  };

  return (
    <>
      {(isWarningModal.warningSignUp || isWarningModal.warningDelete) &&
        handleModalWarning()}
      <div
        className="event-card grid-cell margin--bt__24"
        onClick={() => handleEventCardClick(id)}
      >
        <div className="event-card--image position-relative">
          <img src={eventPhoto !== null ? eventPhoto : park} alt="Park" />
          <div className="fav-button--container">
            <button
              className="fav-button"
              onClick={
                loggedProfile && hasLike
                  ? (e) => {
                      e.stopPropagation();
                      handleLike(hasLike, id);
                    }
                  : () => handleEventCardClick(id)
              }
            >
              <LikeIcon
                className={
                  hasLike ? "event-card--like--active" : "event-card--like"
                }
              />
            </button>
            {loggedProfile?.id === profileIdCreator && (
              <DotsMenu className="especific-align__event-card">
                <p className="profile-page__option">Edit event</p>
                {profileIdAsisstant?.includes(loggedProfile.id) && (
                  <p className="profile-page__option">Cancel attendance</p>
                )}
                <p
                  className="profile-page__option"
                  onClick={() =>
                    setIsWarningModal({
                      ...isWarningModal,
                      warningDelete: true,
                    })
                  }
                >
                  Delete event
                </p>
              </DotsMenu>
            )}
          </div>
        </div>
        <div className="event-card--bottom-section">
          <div className="event-card--text">
            <div className="display--flex gap__4">
              <p className="event-card--text__date">
                {normalizeDate(eventDateTime)}
              </p>
              <p className="event-card--text__date">
                {normalizeTime(eventDateTime)}
              </p>
            </div>
            <h3 className="event-card--text__title">{eventTitle}</h3>
            <p className="event-card--text__p--gray">{location}</p>
          </div>
          <div className="event-card--footer">
            <p className="event-card--text__tag">
              {capitalizeFirstLetter(activity)}
            </p>
            <div className="event-card--rating">
              <img src={bone} alt="Bone Icon" />
              <p>{randomRating()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
