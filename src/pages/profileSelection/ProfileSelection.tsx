import { ProfileCard } from "../../components/profileCard/ProfileCard";
import { getOneProfile } from "../../dataBase/services/readFunctions";
import { useContext } from "react";
import { AuthContext } from "../../hooks/auth/AuthContext";
import { AddDogButton } from "../../components/addDogButton/AddDogButton";
import { toast } from "react-toastify";
import "./ProfileSelection.css";

export const ProfileSelection = () => {
  const { user, loggedProfile, login } = useContext(AuthContext);

  const logInProfile = async (profileId: string) => {
    if (!user) return;
    const profileData = await getOneProfile(profileId);

    if (!profileData) {
      toast.error(
        "Ups, there was an error with the profiles, please reload the page"
      );
      return;
    }
    login(user, profileData);
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
        {user?.profiles?.map((profile, index) => (
          <div onClick={() => logInProfile(profile)}>
            <ProfileCard
              key={index}
              eventId={profile}
              loggedIn={loggedProfile?.id === profile}
            />
          </div>
        ))}
        <AddDogButton />
      </div>
    </div>
  );
};
