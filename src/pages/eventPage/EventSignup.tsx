import { Button } from "../../components/button/Button";
import { WarningModal } from "../../components/modals/warningModal/WarningModal";
import { ProfileCardHorizontal } from "../../components/profileCardHorizontal/ProfileCardHorizontal";
import { eventSignUp } from "../../dataBase/services/updateFunctions";
import { EventSignupProps } from "../../types";
import { useState } from "react";
import { toast } from "react-toastify";

export const EventSignup = ({
  eventData,
  profiles,
  handleEventSignUp,
}: EventSignupProps) => {
  const [isSelectProfileModalOpen, setIsSelectProfileModalOpen] =
    useState<boolean>(false);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

  //Funcion para añadir el perfil al useState o quitarlo
  const toggleProfileSelection = (profileId: string) => {
    setSelectedProfiles((prev) => {
      if (prev.includes(profileId)) {
        // Si ya está seleccionado, lo quitamos
        console.log("desapuntado");
        return prev.filter((id) => id !== profileId);
      } else {
        // Si no está seleccionado, lo añadimos
        console.log("apuntado");
        return [...prev, profileId];
      }
    });
  };

  //Función para apuntar varios perfiles seleccionados al evento
  const handleJoinMultipleProfiles = async () => {
    console.log("entra aquí");
    if (!eventData) return;
    if (selectedProfiles.length === 0) return;

    try {
      await Promise.all(
        selectedProfiles.map((profileId) =>
          eventSignUp(profileId, eventData.id)
        )
      );
      console.log("pasa el await");

      handleEventSignUp(true, selectedProfiles);

      toast.success(
        `You joined the event with ${selectedProfiles.length} ${
          selectedProfiles.length > 1 ? "profiles" : "profile"
        }`
      );
      setIsSelectProfileModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating attendance.");
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsSelectProfileModalOpen(true)}
        className='primary'
      >
        Join Us
      </Button>
      {isSelectProfileModalOpen && (
        <WarningModal
          modalText="Select the pup who's ready for an adventure."
          buttonText='Join event'
          onClose={() => setIsSelectProfileModalOpen(false)}
          className='color-white'
        >
          {profiles.map((profile) => (
            <ProfileCardHorizontal
              key={profile.id}
              mockData={profile}
              selected={selectedProfiles.includes(profile.id)}
              onToggle={() => toggleProfileSelection(profile.id)}
            />
          ))}
          <div className='display--flex justify-content--center'>
            <Button className='primary' onClick={handleJoinMultipleProfiles}>
              Join the event
            </Button>
          </div>
        </WarningModal>
      )}
      {/* Falta el mapa */}
    </>
  );
};
