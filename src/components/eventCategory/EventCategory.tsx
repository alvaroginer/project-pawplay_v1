import { useState } from "react";
import { EventCategoryProps } from "../../types";
import { capitalizeFirstLetter } from "../../functions/Functions";
import "./EventCategory.css";

/* 
Tareas:
  - Separar componente descripción
  - Diseño select options CSS
  - Modificar Select de año nacimiento
  - Pasar lógica del select al componente del input??
*/

export const EventCategory = ({
  img,
  title,
  info,
  editable,
  selectData,
}: EventCategoryProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [categoryValue, setCategoryValue] = useState<string>(info);

  const handleEditType = () => {
    if (editable === "string") {
      return (
        <input
          type="text"
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
          className={`category--text__input max-width-150${
            categoryValue.length === 0 || categoryValue.length > 20
              ? " category--text__input--error"
              : ""
          }`}
        />
      );
    } else if (selectData !== undefined) {
      return (
        <select
          value={categoryValue}
          className="category--select"
          onChange={(e) => setCategoryValue(e.target.value)}
        >
          {selectData.map((data) => {
            return (
              <option
                className="category--select__option"
                value={data}
                key={data}
              >
                {data}
              </option>
            );
          })}
        </select>
      );
    }
  };
  console.log(typeof categoryValue, categoryValue);
  return (
    <div className="event--category">
      <div className="event--category__img">
        <img src={img} alt={`${title} icon`} />
      </div>
      <div className="event--category__text">
        <h4 className="category--text__title">{title}</h4>
        <div className="category--text-container">
          {isEditable ? (
            handleEditType()
          ) : (
            <p className="category--text__text">
              {capitalizeFirstLetter(categoryValue).trim()}
            </p>
          )}

          {editable !== "" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="category--text__icon"
              onClick={() => {
                if (categoryValue.length === 0 || categoryValue.length > 20) {
                  alert("The text must be between 1 and 20 characters");
                } else {
                  setIsEditable(!isEditable);
                }
              }}
              role="button"
              aria-label="Toggle edit"
            >
              <path d="M20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87M3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25Z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
