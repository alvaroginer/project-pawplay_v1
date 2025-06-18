import { capitalizeFirstLetter } from "../../functions/Functions";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getOneProfile } from "../../dataBase/services/readFunctions";
import { ProfileData, EventData } from "../../types";
import { db } from "../../dataBase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ProfileCardSkeleton } from "../skeletons/profileCardSkeleton/ProfileCradSkeleton";
import "./ProfileCard.css";
import dogUser from "../../imgs/dogUser.jpg";
import bone from "../../imgs/profileCard/bone.svg";

// Ya se pueden crear las funciones que calculan el rating por ejemplo
type ProfileCardProps = {
  eventId: string;
  loggedIn?: boolean;
};

export const ProfileCard = ({ eventId, loggedIn }: ProfileCardProps) => {
  const [profileData, setProfileData] = useState<ProfileData>();
  const [createdEventsByProfile, setCreatedEventsByProfile] =
    useState<EventData[]>();

  const navigate = useNavigate();

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

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".dots-menu--container")) return;

    navigate(`/profile/${eventId}`);
  };

  return !profileData ? (
    <ProfileCardSkeleton />
  ) : (
    <div
      className={`profile--card ${loggedIn && "selected"}`}
      onClick={handleCardClick}
    >
      <div className='profile--card__image-container'>
        <img
          className='profile--card__image'
          src={profileData.profilePhoto ? profileData.profilePhoto : dogUser}
          alt='Profile Image'
        />
      </div>
      <div className='profile--card__info'>
        <p
          className={`profile--card__name ${
            profileData.profileName ? "" : "profile--card__uncompleted"
          }`}
        >
          {profileData.profileName
            ? capitalizeFirstLetter(profileData.profileName)
            : "Field incompleted"}
        </p>
        <div className='profile--card__block-rating'>
          <div className='profile--card__rating'>
            <img className='profile--card__icon' src={bone} alt='' />
            <p className='profile--card__value'>{0}</p>
          </div>
          <p className='profile--card__label'>Rating</p>
        </div>
        <div className='profile--card__block-events'>
          <p className='profile--card__value'>
            {createdEventsByProfile?.length ?? 0}
          </p>
          <p className='profile--card__label'>Events created</p>
        </div>
      </div>
    </div>
  );
};
