import { toast } from "react-toastify";
import { eventUnregister } from "../../dataBase/services/updateFunctions";
import { Button } from "../../components/button/Button";
import { EventUnregisterProps } from "../../types";

export const EventUnregister = ({
  eventData,
  profiles,
  setHasJoined,
  fetchEvent,
}: EventUnregisterProps) => {
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

  return (
    <Button onClick={handleCancelAssistance} className="terciary">
      Cancel assistance
    </Button>
  );
};
