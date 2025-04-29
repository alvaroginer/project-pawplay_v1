import { InputProps } from "../../types";
import "./Input.css";

export const Input = (props: InputProps) => {
  const {
    label,
    placeholder,
    name,
    value,
    onChange,
    className,
    disabled,
    type,
  } = props;

  return (
    <>
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          type={type ? `${type}` : "text"}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={`input ${className || ""}`}
          disabled={disabled}
        />
      </div>
    </>
  );
};
