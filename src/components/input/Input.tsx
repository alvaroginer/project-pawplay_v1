import React from "react";
import { useState } from "react";
import { InputProps } from "../../types";
import "./Input.css";

export const Input = React.forwardRef<
  HTMLInputElement | HTMLSelectElement,
  InputProps
>((props, ref) => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const val = e.target.value;
    setInputContent(val);
    onChange?.(e); // delegamos al onChange que venga de RHF (ya sea register o Controller)
  };

  return (
    <>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      {editable === "string" ? (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={name}
          type={type ? `${type}` : "text"}
          placeholder={placeholder}
          name={name}
          value={value ?? undefined}
          onChange={handleChange}
          className={`input ${className || ""}`}
          disabled={disabled}
        />
      ) : (
        <select
          ref={ref as React.Ref<HTMLSelectElement>}
          id={name}
          name={name}
          value={value ? value : ""}
          onChange={handleChange}
          className={`input ${helpText ? "input--error" : ""} ${
            className || ""
          }`}
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
      <div
        className={`input--help-text__container ${
          !helpText && !charLimit && "input--help-text__container--width__0"
        } `}
      >
        {helpText && (
          <p className="input--help-text input--help-text__error">{helpText}</p>
        )}

        {charLimit && (
          <p
            className={`input--help-text text-align-right  ${
              inputContent.length > charLimit ? "input--help-text__error" : ""
            }`}
          >{`${inputContent.length}/${charLimit}`}</p>
        )}
      </div>
    </>
  );
});
