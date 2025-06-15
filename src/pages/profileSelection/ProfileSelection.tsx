import { ProfileCard } from "../../components/profileCard/ProfileCard";
import { getProfilesFromUser } from "../../dataBase/services/readFunctions";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../hooks/auth/AuthContext";
import { AddDogButton } from "../../components/addDogButton/AddDogButton";
import { ProfileData } from "../../types";
import { toast } from "react-toastify";
import { ProfileCardSkeleton } from "../../components/skeletons/profileCardSkeleton/ProfileCradSkeleton";

import "./ProfileSelection.css";

export const ProfileSelection = () => {
  const [userProfiles, setUserProfiles] = useState<ProfileData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user, loggedProfile, login } = useContext(AuthContext);

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
      setIsLoading(false);
    };
    fetchUserProfiles();
  }, [user]);

  const logInProfile = (profile: ProfileData) => {
    if (!user) return;
    login(user, profile);
    toast(`You are now logged with this profile`);
  };

  return (
    <div className='profile-selection'>
      <div className='profile-selection__info'>
        <p className='profile-selection__title'>Select a profile</p>
        <p className='profile-selection__text'>
          Manage and select profiles for your dogs. Each one lets you join
          events, connect with others, and track their activity. Got a new dog?
          Just create a profile.
        </p>
      </div>
      <div className='profile-selection__profiles-container'>
        {isLoading
          ? Array.from({ length: 2 }).map((_, i) => (
              <ProfileCardSkeleton key={i} />
            ))
          : userProfiles?.map((profile, index) => (
              <div onClick={() => logInProfile(profile)}>
                <ProfileCard
                  key={index}
                  eventId={profile.id}
                  loggedIn={loggedProfile?.id === profile.id}
                />
              </div>
            ))}
        <AddDogButton />
      </div>
    </div>
  );
};
