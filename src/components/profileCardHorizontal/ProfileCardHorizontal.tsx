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
}: {
  profileId?: string;
  mockData?: ProfileData;
}) => {
  const [profileData, setProfileData] = useState<ProfileData>();

  //   useEffect(() => {
  //     const fecthProfile = async () => {
  //       const profileSnap = await getDoc(doc(db, "profiles", profileId));

  //       if (!profileSnap.exists()) {
  //         console.warn(`Perfil con ID ${profileId} no encontrado.`);
  //         return;
  //       }

  //       const typedProfile = profileSnap.data() as ProfileData;
  //       setProfileData(typedProfile);
  //     };

  //     fecthProfile();
  //   }, [profileId]);

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
        <div className="profile-card-horizontal__container">
          <input type="checkbox" />
          <div className="profile-card-horizontal__info">
            <img
              className="profile--card__image small-image"
              // src={profileData.profilePhoto ?? dogUser}
              src={dogUser}
              alt="Profile"
            />
            <p>{capitalizeFirstLetter(profileData.profileName)}</p>
          </div>
        </div>
      )}
    </div>
  );
};
