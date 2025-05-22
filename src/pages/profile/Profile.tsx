import { InfoCategoryProfile } from "../../components/infoCategoryProfile/InfoCategoryProfile";
import { Accordion } from "../../components/accordion/Accordion";
import {
  dogBreedsType,
  dogSizesType,
  dogGenderType,
  dogAgeType,
  ProfileData,
  UserData,
} from "../../types";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { WarningModal } from "../../components/modals/warningModal/WarningModal";
import { useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import {
  getOneProfile,
  getOneUser,
} from "../../dataBase/services/readFunctions";
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
import dogIcon from "../../imgs/profilePage/dog.svg";
import "./Profile.css";

export const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileData>();
  const [userInfo, setUserInfo] = useState<UserData>();
  const [isOptionsMenuOpen, setisOptionsMenuOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState<boolean>(false);

  const { loggedProfile, user } = useContext(AuthContext);

  const { profileId } = useParams();
  const profileIdParamsStr: string = profileId ?? "";

  useEffect(() => {
    const fetchProfile = async () => {
      const profileSnap = await getOneProfile(profileIdParamsStr);

      if (profileSnap === null) {
        return;
      }

      setProfileInfo(profileSnap);
    };

    fetchProfile();
  }, [profileIdParamsStr]);

  useEffect(() => {
    if (!profileInfo || !loggedProfile) return;

    if (loggedProfile.id !== profileInfo.id) return;

    const fetchUser = async () => {
      const userSnap = await getOneUser(profileInfo.userUid);

      if (userSnap === null) {
        return;
      }

      setUserInfo(userSnap);
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

  if (!loggedProfile || !user) return;

  if (!profileInfo) {
    return null;
  } else {
    return (
      <>
        <div className='profile-page__actions1'>
          <img
            src={arrow}
            alt='Icon arrow to go back'
            className='profile-page__back-icon'
          />
          <div className='profile-page__dots-container'>
            <img
              src={dots}
              alt='Dots icon for options'
              onClick={toggleOptionsMenu}
              className='dots'
            />
            {isOptionsMenuOpen && (
              <div className='profile-page__options-container'>
                <p className='profile-page__option' onClick={toggleDeleteModal}>
                  Delete profile
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='profile-page'>
          <div className='profile-page__image-container'>
            <img
              src={dogUser}
              alt='Profile picture of the dog'
              className='profile-page__image'
            />
          </div>

          <div className='profile-page__details-container'>
            <div className='profile-page__actions2'>
              <img
                src={arrow}
                alt='Icon arrow to go back'
                className='profile-page__back-icon'
              />

              <div className='profile-page__dots-container'>
                <img
                  src={dots}
                  alt='Dots icon for options'
                  onClick={toggleOptionsMenu}
                  className='dots'
                />
                {isOptionsMenuOpen && (
                  <div className='profile-page__options-container'>
                    <p
                      className='profile-page__option'
                      onClick={toggleDeleteModal}
                    >
                      Delete profile
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className='profile-page__info'>
              <p className='profile-page__info-name'>
                {loggedProfile.id === profileInfo.id
                  ? `My profile`
                  : `${capitalizeFirstLetter(
                      profileInfo.profileName
                    )}'s profile`}
              </p>
              <div className='profile-page__info_container'>
                {loggedProfile.id === profileInfo.id && (
                  <InfoCategoryProfile
                    img={dogIcon}
                    reference={{
                      title: "Dog's Name",
                      dbCategory: "profileName",
                    }}
                    info={loggedProfile.profileName}
                    // editable={loggedProfile.id === profileInfo.id ? "string" : ""}
                    editable={""}
                  />
                )}
                <InfoCategoryProfile
                  img={star}
                  reference={{
                    title: "Rating",
                    dbCategory: "rating",
                  }}
                  info={`4.5`}
                  // editable={loggedProfile.id === profileInfo.id ? "string" : ""}
                  editable={""}
                />
                <InfoCategoryProfile
                  img={medal}
                  reference={{
                    title: "Breed",
                    dbCategory: "breed",
                  }}
                  info={profileInfo.breed}
                  editable={loggedProfile.id === profileInfo.id ? "select" : ""}
                  selectData={dogBreedsType}
                />
              </div>
              <div className='profile-page__info_container'>
                <InfoCategoryProfile
                  img={account}
                  reference={{
                    title: "Owner's Name",
                    dbCategory: "ownerName",
                  }}
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
              <div className='profile-page__info_container'>
                <InfoCategoryProfile
                  img={timer}
                  reference={{
                    title: "Age",
                    dbCategory: "age",
                  }}
                  info={`${profileInfo.age}`}
                  editable={loggedProfile.id === profileInfo.id ? "select" : ""}
                  selectData={dogAgeType}
                />
                <InfoCategoryProfile
                  img={gender}
                  reference={{
                    title: "Gender",
                    dbCategory: "gender",
                  }}
                  info={profileInfo.gender}
                  editable={loggedProfile.id === profileInfo.id ? "select" : ""}
                  selectData={dogGenderType}
                />
                <InfoCategoryProfile
                  img={ruler}
                  reference={{
                    title: "Size",
                    dbCategory: "size",
                  }}
                  info={profileInfo.size}
                  editable={loggedProfile.id === profileInfo.id ? "select" : ""}
                  selectData={dogSizesType}
                />
              </div>
              <div className='profile-page__info_container margin--bt__200'>
                <InfoCategoryProfile
                  img={description}
                  reference={{
                    title: "Description",
                    dbCategory: "profileBio",
                  }}
                  info={profileInfo.profileBio}
                  editable={loggedProfile.id === profileInfo.id ? "select" : ""}
                />
              </div>
              <div className='accordion-container'>
                {loggedProfile.id === profileInfo.id && (
                  <>
                    <Accordion
                      text={"My upcoming events"}
                      defaultOpen={true}
                      eventTypes='upcoming events'
                      profileId={profileInfo.id}
                      likedEvents={profileInfo.likedEvents}
                    />
                    <Accordion
                      text={"Hosted hangouts"}
                      defaultOpen={false}
                      eventTypes='hosted events'
                      profileId={profileInfo.id}
                      likedEvents={profileInfo.likedEvents}
                    />
                    <Accordion
                      text={"Favourite Events"}
                      defaultOpen={false}
                      eventTypes='favourite events'
                      profileId={profileInfo.id}
                      likedEvents={profileInfo.likedEvents}
                    />
                    <Accordion
                      text={"Past adventures"}
                      defaultOpen={false}
                      eventTypes='past events'
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
            modalText='Are you sure you want to delete this lovely dog profile?'
            buttonText='Yes, I am sure'
            onClose={() => setisDeleteModalOpen(false)}
          />
        )}
      </>
    );
  }
};
