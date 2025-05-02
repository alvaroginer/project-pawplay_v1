import { EventCategory } from "../../components/eventCategory/EventCategory";
import { Accordion } from "../../components/accordion/Accordion";
import { ViewMoreCard } from "../../components/viewMoreCard/ViewMoreCard";
import { EventCard } from "../../components/eventCard/EventCard";
import { CardData } from "../../components/eventCard/EventCard";
import { Link } from "react-router";
import { useState } from "react";
import {
  dogBreedsType,
  dogSizesType,
  dogGenderType,
  dogAgeType,
} from "../../types";
import { WarningModal } from "../../components/modals/warningModal/WarningModal";
import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
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
  const { user } = useContext(AuthContext);

  // Params for url
  const params = useParams();
  console.log(params);

  const exampleEventData: CardData = {
    id: 1,
    name: "Afternoon of games",
    date: "July 28",
    time: "4:00 PM",
    location: "Central Park, Play Area",
    activity: "Fetch, chase, socialising",
    rating: 4,
    breed: "All breeds welcome",
    size: "Medium to Large",
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

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
                info={"Bob Jackson"}
                editable="string"
              />
              <EventCategory
                img={dog}
                title={"Dog's name"}
                info={"Moon"}
                editable={"string"}
              />
              <EventCategory
                img={star}
                title={"Rating"}
                info={"4.5 Stars"}
                editable={""}
              />
              <EventCategory
                img={medal}
                title={"Breed"}
                info={"Pitbull"}
                editable={"select"}
                selectData={dogBreedsType}
              />
            </div>
            <div className="profile-page__info-right">
              <EventCategory
                img={timer}
                title={"Age"}
                info={"6"}
                editable={"select"}
                selectData={dogAgeType}
              />
              <EventCategory
                img={gender}
                title={"Gender"}
                info={"Male"}
                editable={"select"}
                selectData={dogGenderType}
              />
              <EventCategory
                img={ruler}
                title={"Size"}
                info={"Medium"}
                editable={"select"}
                selectData={dogSizesType}
              />
            </div>
          </div>
          <div className="profile-page__description">
            <EventCategory
              img={description}
              title={"Description"}
              info={
                "Moon is a loving, sociable dog and is always ready to make new friends, both human and doggy. He loves to run in the park, play with his ball and get cuddles all the time. He is very intelligent and learns tricks easily, especially if there are treats involved." // Texto completo
              }
              fullWidth={true}
              editable={"string"}
            />
          </div>
        </div>
      </div>
      <div className="accordion-container">
        <Accordion text={"My upcoming events"} defaultOpen={true}>
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <Link to="/my-events" className="accordion__view-all-link">
            <ViewMoreCard />
          </Link>
        </Accordion>
        <Accordion text={"Hosted hangouts"}>
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <Link to="/my-events" className="accordion__view-all-link">
            <ViewMoreCard />
          </Link>{" "}
        </Accordion>
        <Accordion text={"Favorites events"}>
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <Link to="/my-events" className="accordion__view-all-link">
            <ViewMoreCard />
          </Link>{" "}
        </Accordion>
        <Accordion text={"Past adventures"}>
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <EventCard event={exampleEventData} />
          <Link to="/my-events" className="accordion__view-all-link">
            <ViewMoreCard />
          </Link>{" "}
        </Accordion>
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
};
