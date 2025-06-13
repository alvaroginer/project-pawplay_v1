import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { disLikeEvent, likeEvent } from "../dataBase/services/updateFunctions";
import { useNavigate } from "react-router";
import { deleteOneEvent } from "../dataBase/services/deleteFunctions";
import { toast } from "react-toastify";

interface useEventCardClickProps {
  handleEventCardClick: (id: string) => void;
  handleLike: (hasLike: boolean, id: string) => void;
  handleDeleteEvent: (id: string) => void;
}

export const useEventCardClick = (): useEventCardClickProps => {
  const {
    user,
    loggedProfile,
    updateAuthContext,
    setIsWarningModal,
    isWarningModal,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEventCardClick = (id: string) => {
    if (user) {
      navigate(`/event/${id}`);
      return;
    } else {
      setIsWarningModal({
        ...isWarningModal,
        warningSignUp: !isWarningModal.warningSignUp,
      });
    }
  };

  const handleLike = async (hasLike: boolean, id: string) => {
    console.log("funcion handleLike");
    if (loggedProfile === null) return;

    if (!hasLike) {
      await likeEvent(loggedProfile.id, id);
    } else {
      await disLikeEvent(loggedProfile.id, id);
    }

    await updateAuthContext();
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteOneEvent(id);

      setIsWarningModal({
        ...isWarningModal,
        warningDelete: false,
      });
      navigate("/");
    } catch {
      toast.error("An error occurred! We couldn't delete your event");
    }
  };

  return {
    handleEventCardClick,
    handleLike,
    handleDeleteEvent,
  };
};
