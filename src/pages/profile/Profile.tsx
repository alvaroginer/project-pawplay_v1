import { EventCategory } from "../../components/eventCategory/EventCategory";
import { Accordion } from "../../components/accordion/Accordion";
import {
  dogBreedsType,
  dogSizesType,
  dogGenderType,
  dogAgeType,
  ProfileData,
  UserData,
} from "../../types";
import { WarningModal } from "../../components/modals/warningModal/WarningModal";
import { useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import {
  getOneProfile,
  getOneUser,
} from "../../dataBase/services/servicesFunctions";
import arrow from "../../imgs/profilePage/arrow-left.svg";
import account from "../../imgs/profilePage/account-outline.svg";
import gender from "../../imgs/profilePage/gender-transgender.svg";
import medal from "../../imgs/profilePage/medal-outline.svg";
import ruler from "../../imgs/profilePage/ruler.svg";
import star from "../../imgs/profilePage/star-outline.svg";
import timer from "../../imgs/profilePage/timer-sand.svg";
import description from "../../imgs/profilePage/description.svg";
import dogUser from "../../imgs/dogUser.jpg";
import dots from "../../imgs/eventCard/dots.svg";
import "./Profile.css";

export const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileData>();
  const [userInfo, setUserInfo] = useState<UserData>();
  const [isOptionsMenuOpen, setisOptionsMenuOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState<boolean>(false);

  const { loggedProfile, user } = useContext(AuthContext);

  // Params for url
  const { profileId } = useParams();
  const profileIdParamsStr: string = profileId ?? "";

  useEffect(() => {
    const fetchProfile = async () => {
      const profileSnap = await getOneProfile(profileIdParamsStr);

      if (!profileSnap.exists()) {
        console.error("El perfil no existe con id:", profileIdParamsStr);
        return;
      }
      const typedProfileSnap: ProfileData = profileSnap.data() as ProfileData;

      setProfileInfo(typedProfileSnap);
    };

    fetchProfile();
  }, [profileIdParamsStr]);

  useEffect(() => {
    if (!profileInfo) return;

    if (loggedProfile.id !== profileInfo.id) return;

    const fetchUser = async () => {
      const userSnap = await getOneUser(profileInfo.userUid);

      if (!userSnap.exists()) {
        console.error("El perfil no existe con id:", profileInfo.userUid);
        return;
      }
      const typedUserSnap: UserData = userSnap.data() as UserData;
      setUserInfo(typedUserSnap);
    };

    fetchUser();
  }, [loggedProfile, profileInfo]);

  const toggleOptionsMenu = () => {
    setisOptionsMenuOpen(!isOptionsMenuOpen);
  };

  const toggleDeleteModal = () => {
    setisDeleteModalOpen(!isDeleteModalOpen);
  };

  console.log(profileInfo);

  if (!profileInfo) {
    return null;
  } else {
    return (
      <>
        <div className="profile-page__actions1">
          <img
            src={arrow}
            alt="Icon arrow to go back"
            className="profile-page__back-icon"
          />
          <div className="profile-page__dots-container">
            <img
              src={dots}
              alt="Dots icon for options"
              onClick={toggleOptionsMenu}
              className="dots"
            />
            {isOptionsMenuOpen && (
              <div className="profile-page__options-container">
                <p className="profile-page__option" onClick={toggleDeleteModal}>
                  Delete profile
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="profile-page">
          <div className="profile-page__image-container">
            <img
              src={dogUser}
              alt="Profile picture of the dog"
              className="profile-page__image"
            />
          </div>
          <div className="profile-page__details-container">
            <div className="profile-page__actions2">
              <img
                src={arrow}
                alt="Icon arrow to go back"
                className="profile-page__back-icon"
              />
              <div className="profile-page__dots-container">
                <img
                  src={dots}
                  alt="Dots icon for options"
                  onClick={toggleOptionsMenu}
                  className="dots"
                />
                {isOptionsMenuOpen && (
                  <div className="profile-page__options-container">
                    <p
                      className="profile-page__option"
                      onClick={toggleDeleteModal}
                    >
                      Delete profile
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="profile-page__info">
              <p className="profile-page__info-name">Robert's profile</p>
              <div className="profile-page__info_container">
                <EventCategory
                  img={star}
                  title={"Rating"}
                  info={`4.5 Stars`}
                  // editable={loggedProfile.id === profileInfo.id ? "string" : ""}
                  editable={""}
                />
                <EventCategory
                  img={medal}
                  title={"Breed"}
                  info={profileInfo.breed}
                  editable={loggedProfile.id === profileInfo.id ? "select" : ""}
                  selectData={dogBreedsType}
                />
              </div>
              <div className="profile-page__info_container">
                <EventCategory
                  img={account}
                  title="Owner's name"
                  info={
                    loggedProfile.id === profileInfo.id
                      ? `${user.name} ${user.lastName}`
                      : userInfo
                      ? `${userInfo.name} ${userInfo.lastName}`
                      : "Unknown owner"
                  }
                  editable={loggedProfile.id === profileInfo.id ? "string" : ""}
                />
              </div>
              <div className="profile-page__info_container">
                <EventCategory
                  img={timer}
                  title={"Age"}
                  info={`${profileInfo.age}`}
                  editable={loggedProfile.id === profileInfo.id ? "select" : ""}
                  selectData={dogAgeType}
                />
                <EventCategory
                  img={gender}
                  title={"Gender"}
                  info={profileInfo.gender}
                  editable={loggedProfile.id === profileInfo.id ? "select" : ""}
                  selectData={dogGenderType}
                />
                <EventCategory
                  img={ruler}
                  title={"Size"}
                  info={profileInfo.size}
                  editable={loggedProfile.id === profileInfo.id ? "select" : ""}
                  selectData={dogSizesType}
                />
              </div>
              <div className="profile-page__info_container">
                <EventCategory
                  img={description}
                  title={"Description"}
                  info={
                    profileInfo.profileBio // Texto completo
                  }
                  editable={loggedProfile.id === profileInfo.id ? "string" : ""}
                />
              </div>
              <div className="accordion-container">
                {loggedProfile.id === profileInfo.id && (
                  <>
                    <Accordion
                      text={"My upcoming events"}
                      defaultOpen={true}
                      eventTypes="upcoming events"
                      profileId={profileInfo.id}
                      likedEvents={profileInfo.likedEvents}
                    />
                    <Accordion
                      text={"Hosted hangouts"}
                      defaultOpen={false}
                      eventTypes="hosted events"
                      profileId={profileInfo.id}
                      likedEvents={profileInfo.likedEvents}
                    />
                    <Accordion
                      text={"Favourite Events"}
                      defaultOpen={false}
                      eventTypes="favourite events"
                      profileId={profileInfo.id}
                      likedEvents={profileInfo.likedEvents}
                    />
                    <Accordion
                      text={"Past adventures"}
                      defaultOpen={false}
                      eventTypes="past events"
                      profileId={profileInfo.id}
                      likedEvents={profileInfo.likedEvents}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {isDeleteModalOpen && (
          <WarningModal
            modalText="Are you sure you want to delete this lovely dog profile?"
            buttonText="Yes, I am sure"
            onClose={() => setisDeleteModalOpen(false)}
          />
        )}
      </>
    );
  }
};
