import { EventData } from "../../types";
import {
  normalizeTime,
  normalizeDate,
  randomRating,
} from "../../functions/Functions";
import {
  likeEvent,
  disLikeEvent,
} from "../../dataBase/services/updateFunctions";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { WarningModal } from "../modals/warningModal/WarningModal";
import { DotsMenu } from "../dotsMenu/DotsMenu";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { useNavigate } from "react-router";
import { deleteOneEvent } from "../../dataBase/services/deleteFunctions";
import { toast } from "react-toastify";
import { Button } from "../button/Button";
import { LikeIcon } from "../../icons/likeIcon/LikeIcon";
import "../../index.css";
import "./EventCard.css";
import park from "../../imgs/image-park.jpg";
import bone from "../../imgs/profileCard/bone.svg";

interface isWarningModalProps {
  warningSignUp: boolean;
  warningDelete: boolean;
}

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
  const [isWarningModal, setIsWarningModal] = useState<isWarningModalProps>({
    warningSignUp: false,
    warningDelete: false,
  });
  const { user, loggedProfile, updateAuthContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const eventDateTime = dateTime.toDate();
  const hasLike = loggedProfile && loggedProfile.likedEvents.includes(id);

  const handleModalWarning = () => {
    if (isWarningModal.warningSignUp) {
      return (
        <WarningModal
          modalText='Paws up! You need to log in before you can join the pack.'
          buttonText='Sign or Log in'
          onClose={handleEventCardClick}
        />
      );
    }

    if (isWarningModal.warningDelete) {
      return (
        <WarningModal
          modalText='Are you sure you want to delete this event?'
          onClose={handleEventCardClick}
        >
          <div className='display--flex space--around gap__4'>
            <Button className='primary' onClick={handleDeleteEvent}>
              Yes
            </Button>
            <Button
              className='primary--outlined'
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

  const handleEventCardClick = () => {
    if (user) {
      navigate(`/event/${id}`);
      return;
    } else {
      setIsWarningModal({ ...isWarningModal, warningSignUp: true });
    }
  };

  const handleLike = async () => {
    if (loggedProfile === null) return;

    if (!hasLike) {
      await likeEvent(loggedProfile.id, id);
    } else {
      await disLikeEvent(loggedProfile.id, id);
    }

    await updateAuthContext();
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteOneEvent(id);
      //pasar
      setIsWarningModal({
        ...isWarningModal,
        warningDelete: false,
      });
      navigate("/");
    } catch {
      toast.error("An error occurred! We couldn't delete your event");
    }
  };

  return (
    <>
      {(isWarningModal.warningSignUp || isWarningModal.warningDelete) &&
        handleModalWarning()}
      <div
        className='event-card grid-cell margin--bt__24'
        onClick={handleEventCardClick}
      >
        <div className='event-card--image position-relative'>
          <img src={eventPhoto !== null ? eventPhoto : park} alt='Park' />
          <div className='fav-button--container'>
            <button
              className='fav-button'
              onClick={
                loggedProfile
                  ? (e) => {
                      e.stopPropagation();
                      handleLike();
                    }
                  : handleEventCardClick
              }
            >
              <LikeIcon
                className={
                  hasLike ? "event-card--like--active" : "event-card--like"
                }
              />
            </button>
            {loggedProfile?.id === profileIdCreator && (
              <DotsMenu className='especific-align__event-card'>
                <p className='profile-page__option'>Edit event</p>
                {profileIdAsisstant?.includes(loggedProfile.id) && (
                  <p className='profile-page__option'>Cancel attendance</p>
                )}
                <p
                  className='profile-page__option'
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
