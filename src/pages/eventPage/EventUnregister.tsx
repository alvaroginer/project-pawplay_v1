import { toast } from "react-toastify";
import { eventUnregister } from "../../dataBase/services/updateFunctions";
import { Button } from "../../components/button/Button";
import { EventUnregisterProps } from "../../types";
import { WarningModal } from "../../components/modals/warningModal/WarningModal";
import { useState } from "react";

export const EventUnregister = ({
  eventData,
  profiles,
}: EventUnregisterProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleIsOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //Funcion para cancelar asistencia
  const handleCancelAssistance = async () => {
    setIsLoading(true);
    if (!eventData || profiles.length === 0) return;

    try {
      const joinedProfiles = profiles.filter((profile) =>
        eventData?.profileIdAsisstant?.includes(profile.id)
      );

      await Promise.all(
        joinedProfiles.map((profile) =>
          eventUnregister(profile.id, eventData.id)
        )
      );
      //Quitamos el spinner
      setIsLoading(false);

      //Cerramos el modal
      setIsModalOpen(false);

      //Notificamos
      toast.success("You've cancelled your attendance with all your profiles.");
    } catch (error) {
      console.error(error);
      toast.error("Error cancelling attendance.");
    }
  };

  return (
    <>
      <Button onClick={handleIsOpenModal} className="secondary--outlined">
        Cancel assistance
      </Button>
      {isModalOpen && (
        <WarningModal
          modalText="Are you sure you want to cancel your assiatance to the event?"
          onClose={handleIsOpenModal}
        >
          <div className="display--flex space--around gap__4">
            <Button className="primary" onClick={handleCancelAssistance}>
              Yes
              {isLoading && (
                <div className="spinner">
                  <div className="spinner__circle"></div>
                </div>
              )}
            </Button>
            <Button className="primary--outlined" onClick={handleIsOpenModal}>
              No
            </Button>
          </div>
        </WarningModal>
      )}
    </>
  );
};
