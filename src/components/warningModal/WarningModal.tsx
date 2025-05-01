import "../warningModal/WarningModal.css";
import { Button } from "../button/Button";
import closeIcon from "../../imgs/close-thick.svg";

type WarningModalProps = {
  onClose: () => void;
};

export const WarningModal = ({ onClose }: WarningModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" aria-label="Cerrar">
          <img src={closeIcon} alt="" onClick={onClose} />
        </button>

        <div className="modal-content">
          <p className="modal-text">
            Are you sure you want to delete this profile? This action is
            irreversible and all associated data will be permanently lost.
          </p>

          <div className="button-container">
            <Button className="" children="Delete profile" />
          </div>
        </div>
      </div>
    </div>
  );
};
