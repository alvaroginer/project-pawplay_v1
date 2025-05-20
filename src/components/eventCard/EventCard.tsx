import { EventData } from "../../types";
import { normalizeTime, normalizeDate } from "../../functions/Functions";
import {
  likeEvent,
  disLikeEvent,
} from "../../dataBase/services/updateFunctions";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { WarningModal } from "../modals/warningModal/WarningModal";
import { DotsMenu } from "../dotsMenu/DotsMenu";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { useNavigate } from "react-router";
import "../../index.css";
import "./EventCard.css";
import park from "../../imgs/image-park.jpg";
// import dots from "../../imgs/eventCard/dots.svg";
import bone from "../../imgs/profileCard/bone.svg";

// Ya se puede crear la función que calcula el rating

export const EventCard = ({ event }: { event: EventData }) => {
  //Destructuring props
  const { eventPhoto, eventTitle, dateTime, location, activity, id } = event;

  //useState and useContext variable declaration
  const [isWarningModal, setIsWarningModal] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>();
  const { user, loggedProfile, updateAuthContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const eventDateTime = dateTime.toDate();

  useEffect(() => {
    const fectchLikeData = () => {
      if (loggedProfile && loggedProfile.likedEvents.includes(id)) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    };
    fectchLikeData();
  }, [loggedProfile, id]);

  const handleEventCardClick = () => {
    if (user) {
      navigate(`/event/${id}`);
    } else {
      setIsWarningModal(!isWarningModal);
    }
  };

  const handleLike = async () => {
    if (!isLike) {
      await likeEvent(loggedProfile.id, id);
      setIsLike(true);
    } else {
      await disLikeEvent(loggedProfile.id, id);
      setIsLike(false);
    }

    await updateAuthContext();
  };

  return (
    <>
      {isWarningModal && !user && (
        <WarningModal
          modalText="Paws up! You need to log in before you can join the pack."
          buttonText="Sign or Log in"
          onClose={handleEventCardClick}
        />
      )}
      <div
        className="event-card grid-cell margin--bt__24"
        onClick={handleEventCardClick}
      >
        <div className="event-card--image position-relative">
          <img src={eventPhoto !== null ? eventPhoto : park} alt="Park" />
          <div className="fav-button--container">
            <button
              className="fav-button"
              onClick={
                loggedProfile
                  ? (e) => {
                      e.stopPropagation();
                      handleLike();
                    }
                  : handleEventCardClick
              }
            >
              <svg
                className={
                  isLike !== true
                    ? "event-card--like"
                    : "event-card--like--active"
                }
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M4.5 7.5C5.60457 7.5 6.5 8.39543 6.5 9.5C6.5 10.6046 5.60457 11.5 4.5 11.5C3.39543 11.5 2.5 10.6046 2.5 9.5C2.5 8.39543 3.39543 7.5 4.5 7.5Z"
                    fill="currentColor"
                    stroke="white"
                  />
                  <path
                    d="M9 3.5C10.1046 3.5 11 4.39543 11 5.5C11 6.60457 10.1046 7.5 9 7.5C7.89543 7.5 7 6.60457 7 5.5C7 4.39543 7.89543 3.5 9 3.5Z"
                    fill="currentColor"
                    stroke="white"
                  />
                  <path
                    d="M15 3.5C16.1046 3.5 17 4.39543 17 5.5C17 6.60457 16.1046 7.5 15 7.5C13.8954 7.5 13 6.60457 13 5.5C13 4.39543 13.8954 3.5 15 3.5Z"
                    fill="currentColor"
                    stroke="white"
                  />
                  <path
                    d="M19.5 7.5C20.6046 7.5 21.5 8.39543 21.5 9.5C21.5 10.6046 20.6046 11.5 19.5 11.5C18.3954 11.5 17.5 10.6046 17.5 9.5C17.5 8.39543 18.3954 7.5 19.5 7.5Z"
                    fill="currentColor"
                    stroke="white"
                  />
                  <path
                    d="M8.84961 21.5C6.93676 21.4998 5.50003 20.1157 5.5 18.4033C5.5 17.3466 6.00547 16.3394 7.0166 15.1836C7.77824 14.3131 8.7918 13.3963 10.0156 12.3447L11.3086 11.2451L11.3086 11.2441L12 10.6572L12.6914 11.2441L12.6914 11.2451L13.9844 12.3447C15.2082 13.3963 16.2218 14.3131 16.9834 15.1836C17.9945 16.3394 18.5 17.3466 18.5 18.4033C18.5 20.1157 17.0632 21.4998 15.1504 21.5C14.0714 21.5 13.0358 21.0284 12.3682 20.3018L12 19.9004L11.6318 20.3018C10.9642 21.0284 9.92861 21.5 8.84961 21.5Z"
                    fill="currentColor"
                    stroke="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {/* <img src={footprint} alt='Dog Footprint' /> */}
            </button>
            <DotsMenu className="especific-align">
              <p className="profile-page__option">Edit event</p>
              <p className="profile-page__option">Cancel attendance</p>
            </DotsMenu>
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
              <p>4</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
