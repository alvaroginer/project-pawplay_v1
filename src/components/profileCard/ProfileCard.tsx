import { capitalizeFirstLetter } from "../../functions/Functions";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getOneProfile } from "../../dataBase/services/readFunctions";
import { ProfileData, EventData } from "../../types";
import { db } from "../../dataBase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { DotsMenu } from "../dotsMenu/DotsMenu";
import { WarningModal } from "../modals/warningModal/WarningModal";
import { getAuth } from "firebase/auth";

import "./ProfileCard.css";
import dogUser from "../../imgs/dogUser.jpg";
import bone from "../../imgs/profileCard/bone.svg";

// Ya se pueden crear las funciones que calculan el rating por ejemplo

export const ProfileCard = ({ eventId }: { eventId: string }) => {
  const [profileData, setProfileData] = useState<ProfileData>();
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState<boolean>(false);
  const [createdEventsByProfile, setCreatedEventsByProfile] =
    useState<EventData[]>();
  const navigate = useNavigate();
  const currentUser = getAuth().currentUser;

  useEffect(() => {
    console.log("se ejecuta el useEffect en el componente de profileCrad");
    const fecthProfile = async () => {
      const profileSnap = await getOneProfile(eventId);

      if (profileSnap === null) {
        return;
      }

      setProfileData(profileSnap);
    };
    fecthProfile();

    const ref = collection(db, "events");
    const q = query(ref, where("profileIdCreator", "==", eventId));
    const fetchQuerySnap = async () => {
      const querySnap = await getDocs(q);
      const typedQuerySnap: EventData[] = querySnap.docs.map(
        (doc) => doc.data() as EventData
      );
      console.log("esto es la query", typedQuerySnap);
      setCreatedEventsByProfile(typedQuerySnap);
    };
    fetchQuerySnap();
  }, [eventId]);

  const toggleDeleteModal = () => {
    setisDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".dots-menu--container")) return;

    navigate(`/profile/${eventId}`);
  };

  if (!profileData) {
    return null;
  } else {
    return (
      <div className="profile--card" onClick={handleCardClick}>
        <div className="profile--card__image-container">
          <img
            className="profile--card__image"
            src={profileData.profilePhoto ? profileData.profilePhoto : dogUser}
            alt="Profile Image"
          />
          {currentUser?.uid === profileData.userUid && (
            <div
              className="dots-menu--container"
              onClick={(e) => e.stopPropagation()}
            >
              <DotsMenu className="especific-align__event-card">
                <p className="profile-page__option" onClick={toggleDeleteModal}>
                  Delete profile
                </p>
              </DotsMenu>
            </div>
          )}
        </div>
        <div className="profile--card__info">
          <p className="profile--card__name">
            {capitalizeFirstLetter(profileData.profileName)}
          </p>
          <div className="profile--card__block-rating">
            <div className="profile--card__rating">
              <img className="profile--card__icon" src={bone} alt="" />
              <p className="profile--card__value">{0}</p>
            </div>
            <p className="profile--card__label">Rating</p>
          </div>
          <div className="profile--card__block-events">
            <p className="profile--card__value">
              {createdEventsByProfile && createdEventsByProfile.length}
            </p>
            <p className="profile--card__label">Events created</p>
          </div>
        </div>
        {isDeleteModalOpen && (
          <WarningModal
            modalText="Are you sure you want to delete this lovely dog profile?"
            buttonText="Yes, I am sure"
            onClose={() => setisDeleteModalOpen(false)}
          />
        )}
      </div>
    );
  }
};

// to={`/profile/${eventId}`}
