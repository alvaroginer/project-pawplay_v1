import "../../index.css";
import "./Button.css";

interface ButtonProps {
  className: string;
  text: string;
}

export const Button = (props: ButtonProps) => {
  const { className, text } = props;
  return <button className={className}>{text}</button>;
};
