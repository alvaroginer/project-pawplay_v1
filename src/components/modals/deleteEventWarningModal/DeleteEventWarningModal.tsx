import { WarningModal } from "../warningModal/WarningModal";
import { Button } from "../../button/Button";
import { useEventCardClick } from "../../../hooks/useEventCardClick";
import { useContext } from "react";
import { AuthContext } from "../../../hooks/auth/AuthContext";

export const DeleteEventWarningModal = ({ id }: { id: string }) => {
  const { setIsWarningModal, isWarningModal } = useContext(AuthContext);
  const { handleDeleteEvent } = useEventCardClick();

  return (
    <WarningModal
      modalText='Are you sure you want to delete this event?'
      onClose={() =>
        setIsWarningModal({
          ...isWarningModal,
          warningDelete: false,
        })
      }
    >
      <div className='display--flex space--around gap__4'>
        <Button className='primary' onClick={() => handleDeleteEvent(id)}>
          Yes
        </Button>
        <Button
          className='primary--outlined'
          onClick={() =>
            setIsWarningModal({
              ...isWarningModal,
              warningDelete: false,
            })
          }
        >
          No
        </Button>
      </div>
    </WarningModal>
  );
};
