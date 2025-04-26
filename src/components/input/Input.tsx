import { InputProps } from "../../types";
import "./Input.css";

export const Input = (props: InputProps) => {
  const { label, placeholder, name, value, onChange, className, disabled } =
    props;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`input ${className || ""}`}
        disabled={disabled}
      />
    </>
  );
};
