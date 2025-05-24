import { useNavigate, useParams } from "react-router";
import { EventCategory } from "../../components/eventCategory/EventCategory";
import { ProfileCard } from "../../components/profileCard/ProfileCard";
import { Accordion } from "../../components/accordion/Accordion";
import { Button } from "../../components/button/Button";
import { WarningModal } from "../../components/modals/warningModal/WarningModal";
import { ProfileCardHorizontal } from "../../components/profileCardHorizontal/ProfileCardHorizontal";
import { getOneEvent } from "../../dataBase/services/readFunctions";
import { EventData } from "../../types";
import {
  normalizeDate,
  normalizeTime,
  normalizePlaces,
} from "../../functions/Functions";
import { ProfileData } from "../../types";
import {
  eventSignUp,
  eventUnregister,
} from "../../dataBase/services/updateFunctions";
import { db } from "../../dataBase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../../auth/AuthContext";
import { useEffect, useState, useContext } from "react";
import "./Event.css";
import arrow from "../../imgs/eventPage/arrow-left.svg";
import share from "../../imgs/eventPage/share.svg";
import footprintBlack from "../../imgs/eventPage/footprint-dog.svg";
import parkImg from "../../imgs/centralPark.jpg";
import location from "../../imgs/eventPage/location.svg";
import tag from "../../imgs/eventPage/tag.svg";
import description from "../../imgs/profilePage/description.svg";
import time from "../../imgs/eventPage/time.svg";
import calendar from "../../imgs/eventPage/calendar.svg";
import dog from "../../imgs/eventPage/dog-side.svg";
import availability from "../../imgs/eventPage/availability.svg";
import { toast, ToastContainer, Slide } from "react-toastify";

export const Event = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [hasJoined, setHasJoined] = useState<boolean>();
  const [similarEvents, setSimilarEvents] = useState<EventData[]>([]);
  const { loggedProfile } = useContext(AuthContext);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState<boolean>(false);
  // Estado para guardar los perfiles encontrados
  const [profiles, setProfiles] = useState<ProfileData[]>([]);

  //Params para la url
  const { eventId } = useParams();
  const paramsStr: string = eventId ?? "";

  useEffect(() => {
    //Fetching Event info
    const fetchEvent = async () => {
      const eventSnap = await getOneEvent(paramsStr);

      if (eventSnap === null) {
        setEventData(null);
        return;
      }

      setEventData(eventSnap);
    };
    fetchEvent();
  }, [paramsStr]);

  const toggleDeleteModal = () => {
    setisDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleHasJoined = async () => {
    if (eventData === null) return;

    if (!hasJoined) {
      await eventSignUp(loggedProfile.id, eventData.id);
      setHasJoined(true);
      // toast.success("You've successfully joined the event!");
    } else {
      await eventUnregister(loggedProfile.id, eventData.id);
      setHasJoined(false);
      // toast.success("You've left the event.");
    }
  };

  const navigate = useNavigate();

  //Función para filtrar lo eventos similares
  useEffect(() => {
    if (!eventData) return;

    const fetchSimilarEvents = async () => {
      const allEvents = await getEvents();

      const filteredEvents = allEvents.filter((event) => {
        return (
          event.activity === eventData.activity && event.id !== eventData.id
        );
      });

      setSimilarEvents(filteredEvents);
    };

    fetchSimilarEvents();
  }, [eventData]);

  //Función para coger de firebase todos los eventos
  const getEvents = async () => {
    const eventsCol = collection(db, "events");
    const eventSnaphot = await getDocs(eventsCol);
    const eventList = eventSnaphot.docs.map((doc) => doc.data());
    const typedEvents: EventData[] = eventList.map((doc) => doc as EventData);
    return typedEvents;
  };

  // Obtenemos el usuario actual desde Firebase Auth
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Si el usuario está logueado, obtenemos su UID
  const userId = currentUser ? currentUser.uid : null;

  // Efecto que se ejecuta una vez que tenemos el userId
  useEffect(() => {
    if (!userId) {
      // Si no hay usuario logueado, salimos del efecto
      console.log("No user is logged in.");
      return;
    }

    // Función asíncrona para obtener los perfiles del usuario logueado
    const fetchProfiles = async () => {
      // Paso 1: Buscar al usuario actual en la colección "users"
      const usersCol = collection(db, "users");
      const userQuery = query(usersCol, where("id", "==", userId)); // Comparamos por el campo "id" del documento
      const userSnapshot = await getDocs(userQuery); // Ejecutamos la consulta

      if (userSnapshot.empty) {
        // Si no se encuentra el usuario, mostramos un error
        console.error("User not found");
        return;
      }

      // Obtenemos el documento del usuario
      const userDoc = userSnapshot.docs[0];
      // Extraemos el array de IDs de perfiles asociados a ese usuario
      const profilesIds = userDoc.data().profiles;

      // Paso 2: Obtener los documentos de perfil que coincidan con esos IDs
      const profilesCol = collection(db, "profiles");
      const profilesQuery = query(profilesCol, where("id", "in", profilesIds));
      const profilesSnapshot = await getDocs(profilesQuery);

      // Convertimos los documentos obtenidos a objetos tipo ProfileData
      const profilesList: ProfileData[] = profilesSnapshot.docs.map((doc) => {
        const data = doc.data(); // Obtenemos los datos del documento
        return {
          ...data, // Copiamos todos los datos originales
          id: doc.id, // Aseguramos que el ID esté presente (en caso de que no esté incluido en los datos)
        } as ProfileData; // Especificamos que este objeto es del tipo ProfileData
      });

      console.log(profilesList); // Mostramos los perfiles por consola
      setProfiles(profilesList); // Guardamos los perfiles en el estado
    };

    // Llamamos a la función para obtener los perfiles
    fetchProfiles();
  }, [userId]);

  // Falta volver a leer el evento una vez modificado el que te hayas apuntado
  // Falta comprobar que el perfil está completo para poder apuntarse

  const fakeProfiles: ProfileData[] = [
    {
      id: "1",
      userUid: "user123",
      profilePhoto: "https://via.placeholder.com/100",
      profileName: "Bobby",
      profileBio: "Friendly pup ready for a walk!",
      age: 3,
      breed: "Labrador",
      gender: "Male",
      size: "Big",
    },
    {
      id: "2",
      userUid: "user456",
      profilePhoto: "https://via.placeholder.com/100",
      profileName: "Luna",
      profileBio: "Loves to explore new parks.",
      age: 2,
      breed: "Beagle",
      gender: "Female",
      size: "Medium",
    },
  ];

  if (!eventData) {
    return null;
  } else {
    return (
      <>
        <div className="event--header">
          <div className="btn--icon">
            <img src={arrow} alt="Return Icon" onClick={() => navigate(-1)} />
          </div>
          <div className="event--header__buttons">
            <button className="btn--icon margin--right__10">
              <img src={share} alt="Share Icon" />
            </button>
            <button className="btn--icon">
              <img src={footprintBlack} alt="Paw-Like Icon" />
            </button>
          </div>
        </div>
        <div className="event--img-container">
          <img
            src={eventData.eventPhoto ? eventData.eventPhoto : parkImg}
            alt=""
          />
        </div>
        <div className="event--container">
          <div className="event--container__left">
            <h3 className="event--title">{eventData.eventTitle}</h3>

            <main className="event--container__categories">
              <EventCategory
                img={calendar}
                reference={{
                  title: "Day",
                  dbCategory: "dateTime",
                }}
                info={normalizeDate(eventData.dateTime.toDate())}
                editable=""
              />
              <EventCategory
                img={time}
                reference={{
                  title: "Start time",
                  dbCategory: "hour",
                }}
                info={normalizeTime(new Date(eventData.hour))}
                editable=""
              />
              <EventCategory
                img={location}
                reference={{
                  title: "Location",
                  dbCategory: "location",
                }}
                info={eventData.location}
                editable=""
              />
              <EventCategory
                img={tag}
                reference={{
                  title: "Activity",
                  dbCategory: "activity",
                }}
                info={eventData.activity}
                editable=""
              />
              <EventCategory
                img={dog}
                reference={{
                  title: "Allowed breeds",
                  dbCategory: "places",
                }}
                info={eventData.breeds}
                editable=""
              />
              <EventCategory
                img={availability}
                reference={{
                  title: "Availability",
                  dbCategory: "places",
                }}
                info={normalizePlaces(eventData.places)}
                editable=""
              />
              <EventCategory
                img={description}
                reference={{
                  title: "Description",
                  dbCategory: "eventDescription",
                }}
                info={eventData.eventDescription}
                editable=""
              />
            </main>
          </div>

          <aside className="event--container__sidebar">
            <h3 className="event--profile-title">Know your organisator</h3>
            <div className="profile-card">
              <ProfileCard eventId={eventData.profileIdCreator} />
            </div>
            <div className="event--modal">
              {hasJoined ? (
                <Button onClick={toggleDeleteModal} className="terciary">
                  Cancel assistance
                </Button>
              ) : (
                <Button onClick={toggleDeleteModal} className="primary">
                  Join Us
                </Button>
              )}
              <ToastContainer transition={Slide} />
            </div>
          </aside>
        </div>
        <div className="event--events-container">
          <Accordion
            text={"Similar Events"}
            profileId=""
            defaultOpen={true}
            similarEvents={similarEvents}
          />
        </div>
        {isDeleteModalOpen && (
          <WarningModal
            modalText="Select the pup who's ready for an adventure."
            buttonText="Join event"
            onClose={() => setisDeleteModalOpen(false)}
            className="color-white"
          >
            {fakeProfiles.map((profile) => (
              <ProfileCardHorizontal key={profile.id} mockData={profile} />
            ))}
          </WarningModal>
        )}
        {/* Falta el mapa */}
      </>
    );
  }
};
