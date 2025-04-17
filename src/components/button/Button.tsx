import { ReactNode } from "react";
import "../../index.css";
import "./Button.css";

interface ButtonProps {
  className: string;
  children: ReactNode;
}

export const Button = ({ className = "primary", children }: ButtonProps) => {
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

  return <button className={`btn ${buttonType}`}>{children}</button>;
};
