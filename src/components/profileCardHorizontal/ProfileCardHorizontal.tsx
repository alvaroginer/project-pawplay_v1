import { capitalizeFirstLetter } from "../../functions/Functions";
import { ProfileData } from "../../types";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import dogUser from "../../imgs/dogUser.jpg";
import "./ProfileCardHorizontal.css";

export const ProfileCardHorizontal = ({ profileId }: { profileId: string }) => {
  const [profileData, setProfileData] = useState<ProfileData>();

  useEffect(() => {
    const fecthProfile = async () => {
      const profileSnap = await getDoc(doc(db, "profiles", profileId));

      if (!profileSnap.exists()) {
        console.warn(`Perfil con ID ${profileId} no encontrado.`);
        return;
      }

      const typedProfile = profileSnap.data() as ProfileData;
      setProfileData(typedProfile);
    };

    fecthProfile();
  }, [profileId]);

  return (
    <div>
      {profileData && (
        <>
          <input type="checkbox" />
          <img
            className="profile--card__image"
            src={profileData.profilePhoto ?? dogUser}
            alt="Profile"
          />
          <p>{capitalizeFirstLetter(profileData.profileName)}</p>
        </>
      )}
    </div>
  );
};
