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
import { useEffect, useState, useContext, useCallback } from "react";
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
import { toast } from "react-toastify";

export const SignUpEvent = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [hasJoined, setHasJoined] = useState<boolean>();
  const [similarEvents, setSimilarEvents] = useState<EventData[]>([]);
  const { loggedProfile } = useContext(AuthContext);
  const [isSelectProfileModalOpen, setIsSelectProfileModalOpen] =
    useState<boolean>(false);
  // Estado para guardar los perfiles encontrados
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

  //Params para la url
  const { eventId } = useParams();
  const paramsStr: string = eventId ?? "";

  //Fetching Event info
  const fetchEvent = useCallback(async () => {
    const eventSnap = await getOneEvent(paramsStr);
    if (eventSnap === null) {
      setEventData(null);
      return;
    }
    setEventData(eventSnap);
  }, [paramsStr]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  //Funcion para añadir el perfil al useState o quitarlo
  const toggleProfileSelection = (profileId: string) => {
    setSelectedProfiles((prev) => {
      if (prev.includes(profileId)) {
        // Si ya está seleccionado, lo quitamos
        return prev.filter((id) => id !== profileId);
      } else {
        // Si no está seleccionado, lo añadimos
        return [...prev, profileId];
      }
    });
  };

  //Función para apuntar varios perfiles seleccionados al evento
  const handleJoinMultipleProfiles = async () => {
    if (eventData === null) return;
    if (selectedProfiles.length <= 1) return;

    try {
      if (!hasJoined) {
        await Promise.all(
          selectedProfiles.map((profileId) =>
            eventSignUp(profileId, eventData.id)
          )
        );
        setHasJoined(true);
        toast.success("Selected profiles joined the event!");
      } else {
        await Promise.all(
          selectedProfiles.map((profileId) =>
            eventUnregister(profileId, eventData.id)
          )
        );
        setHasJoined(false);
        toast.success("Selected profiles left the event.");
      }

      setIsSelectProfileModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating attendance.");
    }
  };

  //Funcion para cancelar asistencia
  const handleCancelAssistance = async () => {
    if (!eventData || profiles.length === 0) return;

    try {
      const joinedProfiles = profiles.filter((profile) =>
        eventData.profileIdAsisstant?.includes(profile.id)
      );

      await Promise.all(
        joinedProfiles.map((profile) =>
          eventUnregister(profile.id, eventData.id)
        )
      );

      setHasJoined(false);
      toast.success("You've cancelled your attendance.");
      fetchEvent(); // Vuelve a cargar los datos del evento
    } catch (error) {
      console.error(error);
      toast.error("Error cancelling attendance.");
    }
  };

  // Si el usuario está logueado, obtenemos su UID

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

  // Funcion para saber si el user tiene un profile o más de uno
  const handleJoinClick = async () => {
    if (eventData === null) return;
    if (profiles.length === 1) {
      await eventSignUp(profiles[0].id, eventData.id);
      setHasJoined(true);
      toast.success("Your pup has joined the event!");
    } else setIsSelectProfileModalOpen(true);
  };

  // Falta volver a leer el evento una vez modificado el que te hayas apuntado
  // Falta comprobar que el perfil está completo para poder apuntarse

  return (
    <>
      <Button onClick={handleJoinClick} className="primary">
        Join Us
      </Button>
      {isSelectProfileModalOpen && (
        <WarningModal
          modalText="Select the pup who's ready for an adventure."
          buttonText="Join event"
          onClose={() => setIsSelectProfileModalOpen(false)}
          onConfirm={handleJoinMultipleProfiles}
          className="color-white"
        >
          {fakeProfiles.map((profile) => (
            <ProfileCardHorizontal
              key={profile.id}
              mockData={profile}
              selected={selectedProfiles.includes(profile.id)}
              onToggle={() => toggleProfileSelection(profile.id)}
            />
          ))}
        </WarningModal>
      )}
      {/* Falta el mapa */}
    </>
  );
};
