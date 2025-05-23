import { Button } from "../../button/Button";
import "./WarningModal.css";
import closeIcon from "../../../imgs/close-thick.svg";
import { Link } from "react-router";

type WarningModalProps = {
  onClose: () => void;
  modalText: string;
  buttonText: string;
};

export const WarningModal = ({
  onClose,
  modalText,
  buttonText,
}: WarningModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" aria-label="Cerrar">
          <img src={closeIcon} alt="" onClick={onClose} />
        </button>

        <div className="modal-content">
          <p className="modal-text">{modalText}</p>
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
