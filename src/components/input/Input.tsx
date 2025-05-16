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
    editable,
    selectData,
  } = props;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      {editable === "string" ? (
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
      ) : (
        <select
          required
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`input ${className || ""}`}
          disabled={disabled}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {selectData?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </>
  );
};
