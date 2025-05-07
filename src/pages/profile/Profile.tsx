import { EventCategory } from "../../components/eventCategory/EventCategory";
import { Accordion } from "../../components/accordion/Accordion";
import {
  dogBreedsType,
  dogSizesType,
  dogGenderType,
  dogAgeType,
  ProfileData,
} from "../../types";
import { WarningModal } from "../../components/modals/warningModal/WarningModal";
import { useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { getOneProfile } from "../../dataBase/services/servicesFunctions";
import arrow from "../../imgs/profilePage/arrow-left.svg";
import account from "../../imgs/profilePage/account-outline.svg";
import dog from "../../imgs/profilePage/dog.svg";
import gender from "../../imgs/profilePage/gender-transgender.svg";
import medal from "../../imgs/profilePage/medal-outline.svg";
import ruler from "../../imgs/profilePage/ruler.svg";
import star from "../../imgs/profilePage/star-outline.svg";
import timer from "../../imgs/profilePage/timer-sand.svg";
import description from "../../imgs/profilePage/description.svg";
import dogUser from "../../imgs/dogUser.jpg";
import "./Profile.css";

export const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileData>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { loggedProfile } = useContext(AuthContext);

  // Params for url
  const { profileId } = useParams();
  const profileIdParamsStr: string = profileId ?? "";
  console.log(profileIdParamsStr, "esto es el profileId tipado");

  useEffect(() => {
    console.log("entra en el useEfect de la página del perfil");
    //console.log(profileInfo.id, "esto es loggedprofile");
    const fetchProfile = async () => {
      const profileSnap = await getOneProfile(profileIdParamsStr);

      if (!profileSnap.exists()) {
        console.error("El evento no existe con id:", profileIdParamsStr);
        return;
      }
      const typedProfileSnap: ProfileData = profileSnap.data() as ProfileData;

      setProfileInfo(typedProfileSnap);
    };

    fetchProfile();
  }, [profileIdParamsStr]);

  const handleClick = () => {
    setIsModalOpen(true);
  };

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="profile-page__delete-icon"
            onClick={handleClick}
          >
            <path d="M9 3V4H4V6H5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z" />
          </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="profile-page__delete-icon"
                onClick={handleClick}
              >
                <path d="M9 3V4H4V6H5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z" />
              </svg>
            </div>
            <div className="profile-page__info">
              <div className="profile-page__info-left">
                <EventCategory
                  img={account}
                  title="Owner's name"
                  info={profileInfo.profileName}
                  editable={loggedProfile.id === profileInfo.id ? "string" : ""}
                />
                <EventCategory
                  img={dog}
                  title={"Dog's name"}
                  info={profileInfo.profileName}
                  editable={loggedProfile.id === profileInfo.id ? "string" : ""}
                />
                <EventCategory
                  img={star}
                  title={"Rating"}
                  info={`4.5 Stars`}
                  editable={loggedProfile.id === profileInfo.id ? "string" : ""}
                />
                <EventCategory
                  img={medal}
                  title={"Breed"}
                  info={profileInfo.breed}
                  editable={loggedProfile.id === profileInfo.id ? "select" : ""}
                  selectData={dogBreedsType}
                />
              </div>
              <div className="profile-page__info-right">
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
            </div>
            <div className="profile-page__description">
              <EventCategory
                img={description}
                title={"Description"}
                info={
                  profileInfo.profileBio // Texto completo
                }
                editable={loggedProfile.id === profileInfo.id ? "string" : ""}
              />
            </div>
          </div>
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
                defaultOpen={true}
                eventTypes="hosted events"
                profileId={profileInfo.id}
                likedEvents={profileInfo.likedEvents}
              />
              <Accordion
                text={"Favourite Events"}
                defaultOpen={true}
                eventTypes="favourite events"
                profileId={profileInfo.id}
                likedEvents={profileInfo.likedEvents}
              />
              <Accordion
                text={"Past adventures"}
                defaultOpen={true}
                eventTypes="past events"
                profileId={profileInfo.id}
                likedEvents={profileInfo.likedEvents}
              />
            </>
          )}
        </div>
        {isModalOpen && (
          <WarningModal
            modalText="Are you sure you want to delete this lovely dog profile?"
            buttonText="Yes, I am sure"
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </>
    );
  }
};
