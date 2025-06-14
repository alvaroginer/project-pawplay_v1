import { Button } from "./Button";
import { useContext } from "react";
import { AuthContext } from "../../hooks/auth/AuthContext";
import { useNavigate } from "react-router";

export const CreateEventButton = () => {
  const { loggedProfile, setIsWarningModal, isWarningModal } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    if (loggedProfile) {
      navigate("/create-event");
    } else {
      setIsWarningModal({
        ...isWarningModal,
        warningSignUp: true,
      });
    }
  };

  return (
    <Button className='primary' onClick={handleCreateEvent}>
      Create Event
    </Button>
  );
};
