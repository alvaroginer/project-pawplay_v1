import "./DotsMenu.css";
import dots from "../../imgs/eventCard/dots.svg";
import { useState } from "react";
import { DotsMenuProps } from "../../types";

export const DotsMenu = (props: DotsMenuProps) => {
  const { children, className } = props;

  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  const toggleOptionsMenu = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };

  return (
    <div className="dots-container" onClick={(e) => e.stopPropagation()}>
      <img
        src={dots}
        alt="Dots icon for options"
        onClick={toggleOptionsMenu}
        className="dots"
      />
      {isOptionsMenuOpen && (
        <div className={`options-container ${className ?? ""}`}>{children}</div>
      )}
    </div>
  );
};
