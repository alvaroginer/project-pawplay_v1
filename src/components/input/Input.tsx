import { useState } from "react";
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
    helpText,
    charLimit,
  } = props;
  const [inputContent, setInputContent] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputContent(newValue);
    onChange?.(e);
  };

  return (
    <div>
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
          onInput={handleInputChange}
        />
      ) : (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`input ${className || ""}`}
          disabled={disabled}
        >
          {selectData?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {helpText ||
        (charLimit && (
          <div className='input--help-text__container'>
            <p className='input--help-text'>{helpText}</p>
            <p
              className={`input--help-text ${
                inputContent.length > charLimit ? "input--help-text__error" : ""
              }`}
            >{`${inputContent.length}/${charLimit}`}</p>
          </div>
        ))}
    </div>
  );
};
