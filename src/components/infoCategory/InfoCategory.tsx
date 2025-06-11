import { useState } from "react";
import { UpdateInfoCategoryProps } from "../../types";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { Input } from "../input/Input";
import { CheckIcon } from "../../icons/checkIcon/CheckIcon";
import { EditIcon } from "../../icons/editIcon/EditIcon";
import "./InfoCategory.css";

export const InfoCategory = ({
  img,
  reference,
  info,
  editable,
  selectData,
  updateFunction,
}: UpdateInfoCategoryProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [categoryValue, setCategoryValue] = useState<string>(info ?? "");

  const handleEditType = () => {
    if (editable === "string") {
      return (
        <Input
          name={reference.dbCategory}
          className={` ${
            // Pasa la clase al componente Input
            categoryValue.length === 0 || categoryValue.length > 20
              ? "input--error"
              : ""
          }`}
          editable='string'
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
        />
      );
    } else if (selectData !== undefined) {
      return (
        <Input
          name={reference.dbCategory}
          className={` ${
            // Pasa la clase al componente Input
            categoryValue.length === 0 || categoryValue.length > 20
              ? "input--error"
              : ""
          }`}
          value={categoryValue}
          editable='select'
          selectData={selectData}
          onChange={(e) => setCategoryValue(e.target.value)}
        />
      );
    }
  };

  const handleEdit = () => {
    if (categoryValue.length === 0 || categoryValue.length > 20) {
      alert("The text must be between 1 and 20 characters");
      return;
    }
    updateFunction(categoryValue); // actualiza en base de datos
    setIsEditable(false);
  };

  return (
    <div className='event--category'>
      <div className='event--category__img'>
        <img
          className='event--category__icon'
          src={img}
          alt={`${reference.title} icon`}
        />
      </div>
      <div className='event--category__text'>
        <h4 className='category--text__title'>{reference.title}</h4>
        <div className='category--text-container'>
          {isEditable ? (
            handleEditType()
          ) : (
            <p
              className={`category--text__text ${
                !categoryValue && "category--text__text--incompleted"
              }`}
            >
              {!categoryValue
                ? "Field incompleted"
                : capitalizeFirstLetter(categoryValue).trim()}
            </p>
          )}

          {editable !== "" &&
            (isEditable ? (
              <CheckIcon onClick={handleEdit} />
            ) : (
              <EditIcon
                onClick={() => {
                  setIsEditable(!isEditable);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
