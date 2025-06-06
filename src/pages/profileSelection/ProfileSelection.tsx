import { ProfileCard } from "../../components/profileCard/ProfileCard";
import { getProfilesFromUser } from "../../dataBase/services/readFunctions";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { AddDogButton } from "../../components/addDogButton/AddDogButton";
import { ProfileData } from "../../types";
import { toast } from "react-toastify";

import "./ProfileSelection.css";

export const ProfileSelection = () => {
  const [userProfiles, setUserProfiles] = useState<ProfileData[]>();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const fetchUserProfiles = async () => {
      const profilesQuery: ProfileData[] | null = await getProfilesFromUser(
        user.uid
      );

      if (!profilesQuery) {
        toast.error(
          "Ups, there was an error with the profiles, please reload the page"
        );
        return;
      }

      setUserProfiles(profilesQuery);
    };
    fetchUserProfiles();
  }, [user]);

  if (!userProfiles) return;

  return (
    <div className="profile-selection">
      <div className="profile-selection__info">
        <p className="profile-selection__title">Select a profile</p>
        <p className="profile-selection__text">
          Manage and select profiles for your dogs. Each one lets you join
          events, connect with others, and track their activity. Got a new dog?
          Just create a profile.
        </p>
      </div>
      <div className="profile-selection__profiles-container">
        {userProfiles.map((profile, index) => (
          <ProfileCard key={index} eventId={profile.id} />
        ))}
        <AddDogButton />
      </div>
    </div>
  );
};
