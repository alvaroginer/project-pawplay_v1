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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputContent(newValue);
    onChange?.(e);
  };

  return (
    <div className='position-relative'>
      <label className='label' htmlFor={name}>
        {label}
      </label>
      {editable === "string" ? (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
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
          ref={ref as React.Ref<HTMLSelectElement>}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`input ${className || ""}`}
          disabled={disabled}
        >
          <option value='' disabled hidden>
            {placeholder}
          </option>
          {selectData?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      <div className='input--help-text__container'>
        {helpText && (
          <p className='input--help-text input--help-text__error position-relative--left'>
            {helpText}
          </p>
        )}

        {charLimit && (
          <p
            className={`input--help-text position-relative--right ${
              inputContent.length > charLimit ? "input--help-text__error" : ""
            }`}
          >{`${inputContent.length}/${charLimit}`}</p>
        )}
      </div>
    </div>
  );
});
