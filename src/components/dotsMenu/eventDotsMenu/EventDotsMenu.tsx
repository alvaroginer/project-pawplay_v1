import { DotsMenu } from "../DotsMenu";
import { useContext } from "react";
import { AuthContext } from "../../../hooks/auth/AuthContext";

export const EventDostMenu = ({
  profileIdAsisstant,
}: {
  profileIdAsisstant: string[];
}) => {
  const { setIsWarningModal, isWarningModal, loggedProfile } =
    useContext(AuthContext);

  if (!loggedProfile) return;

  return (
    <DotsMenu className='especific-align__event-card'>
      <p className='profile-page__option'>Edit event</p>
      {profileIdAsisstant?.includes(loggedProfile.id) && (
        <p className='profile-page__option'>Cancel attendance</p>
      )}
      <p
        className='profile-page__option'
        onClick={() =>
          setIsWarningModal({
            ...isWarningModal,
            warningDelete: true,
          })
        }
      >
        Delete event
      </p>
    </DotsMenu>
  );
};
