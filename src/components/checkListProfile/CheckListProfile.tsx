import "./CheckListProfile.css";
import { AuthContext } from "../../hooks/auth/AuthContext";
import { Link } from "react-router";
import {
  dogAgeType,
  dogBreedsType,
  dogGenderType,
  dogSizesType,
} from "../../types";
import { useState, useContext } from "react";

export const CheckListProfile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { loggedProfile, user } = useContext(AuthContext);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  if (loggedProfile === null || user === null) return;

  const checklistItems = [
    {
      id: "ownerName",
      label: "Owner's name",
      completed: user.name !== "" && user.lastName !== "",
    },
    {
      id: "dogName",
      label: "Dog's name",
      completed: loggedProfile.profileName !== "",
    },
    {
      id: "photo",
      label: "Picture",
      completed: loggedProfile.profilePhoto !== "",
    },
    {
      id: "breed",
      label: "Breed",
      completed:
        loggedProfile.breed && dogBreedsType.includes(loggedProfile.breed),
    },
    {
      id: "age",
      label: "Age",
      completed: loggedProfile.age && dogAgeType.includes(loggedProfile.age),
    },
    {
      id: "gender",
      label: "Gender",
      completed:
        loggedProfile.gender && dogGenderType.includes(loggedProfile.gender),
    },
    {
      id: "size",
      label: "Size",
      completed:
        loggedProfile.size && dogSizesType.includes(loggedProfile.size),
    },
    {
      id: "description",
      label: "Description",
      completed: loggedProfile.profileBio !== "",
    },
  ];

  // Calculo barra de progreso
  const total = checklistItems.length;
  const completed = checklistItems.filter((item) => item.completed).length;
  const progress = (completed / total) * 100;
  const progressPercentage = Math.round((completed / total) * 100);

  return (
    <>
      <div className="checklist" onClick={handleClick}>
        <p className="checklist__title">Complete your profile</p>
        <svg
          className="checklist__chevron"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16.59 15.4199L12 10.8299L7.41 15.4199L6 13.9999L12 7.99992L18 13.9999L16.59 15.4199Z"
            fill="black"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="checklist__expanded">
          <div className="checklist__header">
            <p className="checklist__title" onClick={handleClick}>
              Complete your profile
            </p>
            <svg
              className="checklist__chevron-expanded"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={handleClick}
            >
              <path
                d="M16.59 15.4199L12 10.8299L7.41 15.4199L6 13.9999L12 7.99992L18 13.9999L16.59 15.4199Z"
                fill="black"
              />
            </svg>
          </div>

          <p className="checklist__description">
            Complete your profile to unlock all features.
          </p>
          <div className="checklist-container__progressbar">
            <progress
              max="100"
              value={progress}
              className="checklist-progressbar"
            ></progress>
            <div className="checklist-progressbar__label">
              {progressPercentage}%
            </div>
          </div>
          <div className="checklist__items-container">
            {checklistItems.map((item, index) => {
              return (
                <Link to={`/profile/${loggedProfile.id}`} key={index}>
                  <div className="checklist__item">
                    <div className="checklist__item-content">
                      <svg
                        className={`checklist__check-icon ${
                          item.completed ? "checklist__check-icon--checked" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"
                          fill=""
                        />
                      </svg>
                      <p
                        className={`checklist__item-title ${
                          item.completed ? "checklist__item-title--checked" : ""
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                    {!item.completed && (
                      <svg
                        className="checklist__arrow-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          d="M2.66668 9.16596L2.66668 7.83263L10.6667 7.83263L7.00002 4.16596L7.94668 3.2193L13.2267 8.4993L7.94668 13.7793L7.00002 12.8326L10.6667 9.16596L2.66668 9.16596Z"
                          fill="black"
                        />
                      </svg>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
