import { ButtonProps } from "../../types";
import "../../index.css";
import "./Button.css";

export const Button = ({
  className = "primary",
  onClick,
  children,
  size = "medium",
}: ButtonProps) => {
  let buttonType: string;
  switch (className) {
    case "primary":
      buttonType = "";
      break;

    case "primary--outlined":
      buttonType = "btn--outlined";
      break;

    case "secondary":
      buttonType = "btn--secondary";
      break;

    case "secondary--outlined":
      buttonType = "btn--secondary__outlined";
      break;

    case "terciary":
      buttonType = "btn--terciary";
      break;

    default:
      buttonType = "";
      break;
  }

  const sizeClass = `btn--${size}`;

  return (
    <button onClick={onClick} className={`btn ${buttonType} ${sizeClass}`}>
      {children}
    </button>
  );
};
