import "./DotsMenu.css";
import dots from "../../imgs/eventCard/dots.svg";
import { useState } from "react";
import { DotsMenuProps } from "../../types";

export const DotsMenu = (props: DotsMenuProps) => {
  const { children } = props;

  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  const toggleOptionsMenu = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };

  return (
    <div className="profile-page__dots-container">
      <img
        src={dots}
        alt="Dots icon for options"
        onClick={toggleOptionsMenu}
        className="dots"
      />
      {isOptionsMenuOpen && (
        <div className="profile-page__options-container">{children}</div>
      )}
    </div>
  );
};

//  <p className="profile-page__option" onClick={toggleDeleteModal}>
//             Delete profile
//           </p>
