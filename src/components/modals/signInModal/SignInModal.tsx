import { Link } from "react-router";
import { Button } from "../../button/Button";
import "./SignInModal.css";
import closeButton from "../../../imgs/close-thick.svg";

export const SignInModal = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="sign-in-modal--container">
      <div className="sign-in-modal" role="dialog" aria-modal="true">
        <div className="display--flex">
          <button onClick={onClick} className="close-button">
            <img src={closeButton} alt="Close Button" />
          </button>
        </div>
        <p>Paws up! You need to log in before you can join the pack. </p>
        <Link to="/signin">
          <Button className="primary">Sign or Log in</Button>
        </Link>
      </div>
    </div>
  );
};
