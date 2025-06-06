import { capitalizeFirstLetter } from "../../functions/Functions";
import { ProfileData } from "../../types";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import dogUser from "../../imgs/dogUser.jpg";
import "./ProfileCardHorizontal.css";

export const ProfileCardHorizontal = ({
  profileId,
  mockData,
  selected,
  onToggle,
}: {
  profileId?: string;
  mockData?: ProfileData;
  selected?: boolean;
  onToggle?: () => void;
}) => {
  const [profileData, setProfileData] = useState<ProfileData>();

  useEffect(() => {
    if (mockData) {
      setProfileData(mockData);
      return;
    }

    // Solo si no hay mockData, consultamos la BDD
    if (profileId) {
      const fetchProfile = async () => {
        const profileSnap = await getDoc(doc(db, "profiles", profileId));
        if (profileSnap.exists()) {
          setProfileData(profileSnap.data() as ProfileData);
        }
      };
      fetchProfile();
    }
  }, [profileId, mockData]);

  return (
    <div>
      {profileData && (
        <div
          onClick={onToggle}
          className={`profile-card-horizontal ${selected ? "selected" : ""}`}
        >
          <input type='checkbox' checked={selected} />
          <div className='profile-card-horizontal__info'>
            <img
              className='profile--card__image small-image'
              src={
                !profileData.profilePhoto ? dogUser : profileData.profilePhoto
              }
              // src={dogUser}
              alt='Profile'
            />
            <p>
              {!profileData.profileName
                ? "Not defined"
                : capitalizeFirstLetter(profileData.profileName)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
