import { Button } from "../../button/Button";
import "./WarningModal.css";
import closeIcon from "../../../imgs/close-thick.svg";
import { Link } from "react-router";
import { WarningModalProps } from "../../../types";

export const WarningModal = ({
  onClose,
  modalText,
  buttonText,
  children,
  className = "",
}: WarningModalProps) => {
  return (
    <div className="modal-overlay">
      <div className={`modal-container ${className}`}>
        <button className="close-button" aria-label="Cerrar">
          <img
            src={closeIcon}
            alt="Button for close the modal"
            onClick={onClose}
          />
        </button>

        <div className="modal-content">
          <p className="modal-text">{modalText}</p>
          <div>{children}</div>
          <Link to="/signin">
            <div className="button-container">
              <Button className="primary">{buttonText}</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
