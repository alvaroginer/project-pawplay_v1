import { InfoCategoryProfile } from "../../components/infoCategoryProfile/InfoCategoryProfile";
import {
  dogBreedsType,
  dogSizesType,
  dogGenderType,
  dogAgeType,
  ProfileData,
  UserData,
} from "../../types";
import { UpcomingEventsAccordion } from "../../components/accordion/upcomingEventsAccordion/UpcomingEventsAccordion";
import { HostedEventsAccordion } from "../../components/accordion/hostedEventsAccordion/HostedEventsAccordion";
import { FavouriteEventsAccordion } from "../../components/accordion/favouriteEventsAccordion/FavouriteEventsAccordion";
import { PastEventsAccordion } from "../../components/accordion/pastEventsAccordion/PastEventsAccordion";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { WarningModal } from "../../components/modals/warningModal/WarningModal";
import { DotsMenu } from "../../components/dotsMenu/DotsMenu";
import { useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../hooks/auth/AuthContext";
import {
  getOneProfile,
  getOneUser,
} from "../../dataBase/services/readFunctions";
import { useNavigate } from "react-router";
import arrow from "../../imgs/profilePage/arrow-left.svg";
import account from "../../imgs/profilePage/account-outline.svg";
import gender from "../../imgs/profilePage/gender-transgender.svg";
import medal from "../../imgs/profilePage/medal-outline.svg";
import ruler from "../../imgs/profilePage/ruler.svg";
import star from "../../imgs/profilePage/star-outline.svg";
import timer from "../../imgs/profilePage/timer-sand.svg";
import description from "../../imgs/profilePage/description.svg";
import dogUser from "../../imgs/dogUser.jpg";
import dogIcon from "../../imgs/profilePage/dog.svg";
import "./Profile.css";

export const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileData>();
  const [userInfo, setUserInfo] = useState<UserData>();
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { loggedProfile, user } = useContext(AuthContext);

  const { profileId } = useParams();
  const profileIdParamsStr: string = profileId ?? "";

  useEffect(() => {
    const fetchProfile = async () => {
      //if (profileInfo) return;
      if (!loggedProfile) return;

      //Comprobamos si el perfil loggeado es el dueño para no tener que cargar desde BBDD
      if (profileIdParamsStr === loggedProfile.id) {
        setProfileInfo(loggedProfile);
        return;
      }

      const profileSnap = await getOneProfile(profileIdParamsStr);

      if (profileSnap === null) return;

      setProfileInfo(profileSnap);
    };

    fetchProfile();

    if (!profileInfo || !loggedProfile) return;

    if (loggedProfile.id !== profileInfo.id) return;

    const fetchUser = async () => {
      const userSnap = await getOneUser(profileInfo.userUid);

      if (userSnap === null) return;

      setUserInfo(userSnap);
    };

    fetchUser();
  }, [profileIdParamsStr, loggedProfile, profileInfo]);

  const toggleDeleteModal = () => {
    setisDeleteModalOpen(!isDeleteModalOpen);
  };

  if (!loggedProfile || !user) return;

  if (!profileInfo) {
    return null;
  }

  const isProfileCreator = loggedProfile.id === profileInfo.id;

  return (
    <>
      <div className='profile-page__actions1'>
        <img
          src={arrow}
          alt='Icon arrow to go back'
          className='profile-page__back-icon'
          onClick={() => navigate(-1)}
        />
        {isProfileCreator && (
          <DotsMenu className=''>
            <p className='profile-page__option' onClick={toggleDeleteModal}>
              Delete profile
            </p>
          </DotsMenu>
        )}
      </div>
      <div className='profile-page'>
        <div className='profile-page__image-container'>
          <img
            src={profileInfo.profilePhoto ? profileInfo.profilePhoto : dogUser}
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
              onClick={() => navigate(-1)}
            />
            {isProfileCreator && (
              <DotsMenu className=''>
                <p className='profile-page__option' onClick={toggleDeleteModal}>
                  Delete profile
                </p>
              </DotsMenu>
            )}
          </div>
          <div className='profile-page__info'>
            <p className='profile-page__info-name'>
              {isProfileCreator
                ? `My profile`
                : `${capitalizeFirstLetter(profileInfo.profileName)}'s profile`}
            </p>
            <div className='profile-page__info_container'>
              {isProfileCreator && (
                <InfoCategoryProfile
                  img={dogIcon}
                  reference={{
                    title: "Dog's Name",
                    dbCategory: "profileName",
                  }}
                  info={loggedProfile.profileName}
                  editable={isProfileCreator ? "string" : ""}
                  // editable={""}
                />
              )}
              <InfoCategoryProfile
                img={star}
                reference={{
                  title: "Rating",
                  dbCategory: "rating",
                }}
                info={`4.5`}
                // editable={isProfileCreator ? "string" : ""}
                editable={""}
              />
              <InfoCategoryProfile
                img={medal}
                reference={{
                  title: "Breed",
                  dbCategory: "breed",
                }}
                info={profileInfo.breed}
                editable={isProfileCreator ? "select" : ""}
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
                  isProfileCreator
                    ? `${user.name} ${user.lastName}`
                    : userInfo
                    ? `${userInfo.name} ${userInfo.lastName}`
                    : "Unknown owner"
                }
                editable={isProfileCreator ? "string" : ""}
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
                editable={isProfileCreator ? "string" : ""}
              />
            </div>
            <div className='accordion-container'>
              {loggedProfile.id === profileInfo.id && (
                <>
                  <UpcomingEventsAccordion profileId={profileInfo.id} />
                  <HostedEventsAccordion profileId={profileInfo.id} />
                  <FavouriteEventsAccordion
                    likedEvents={profileInfo.likedEvents}
                  />
                  <PastEventsAccordion profileId={profileInfo.id} />
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
};
