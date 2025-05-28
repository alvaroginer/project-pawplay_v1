import { Button } from "../../components/button/Button";
import { WarningModal } from "../../components/modals/warningModal/WarningModal";
import { ProfileCardHorizontal } from "../../components/profileCardHorizontal/ProfileCardHorizontal";
import { ProfileData } from "../../types";
import {
  eventSignUp,
  eventUnregister,
} from "../../dataBase/services/updateFunctions";
import { EventSignupProps } from "../../types";
import { useState } from "react";
import "./EventSignup.css";
import { toast } from "react-toastify";

export const EventSignup = ({ eventData, profiles }: EventSignupProps) => {
  const [hasJoined, setHasJoined] = useState<boolean>();
  const [isSelectProfileModalOpen, setIsSelectProfileModalOpen] =
    useState<boolean>(false);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

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

  // Funcion para saber si el user tiene un profile o más de uno
  const handleJoinClick = async () => {
    if (eventData === null) return;
    if (fakeProfiles.length === 1) {
      //Cambiar fakeProfiles por profiles
      await eventSignUp(profiles[0].id, eventData.id);
      setHasJoined(true);
      toast.success("Your pup has joined the event!");
    } else setIsSelectProfileModalOpen(true);
  };

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
