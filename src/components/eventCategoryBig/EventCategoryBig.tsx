import { EventCategoryBigProps } from "../../types";
import { useState, useContext } from "react";
import { AuthContext } from "../../hooks/auth/AuthContext";
import { updateProfileCategoryDB } from "../../dataBase/services/updateFunctions";
import { capitalizeFirstLetter } from "../../functions/Functions";
import "./EventCategoryBig.css";
import { Input } from "../input/Input";
import { toast } from "react-toastify";

export const EventCategoryBig = ({
  img,
  reference,
  info,
  editable,
}: EventCategoryBigProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [categoryValue, setCategoryValue] = useState<string>(info ?? "");
  const { loggedProfile, updateAuthContext } = useContext(AuthContext);

  const updateProfileInfo = async (inputData: string) => {
    if (!loggedProfile) return;

    setCategoryValue(inputData);
    if (reference.dbCategory === "age") {
      const dataToNumber = Number(inputData);
      await updateProfileCategoryDB(
        loggedProfile.id,
        reference.dbCategory,
        dataToNumber
      );
    } else {
      await updateProfileCategoryDB(
        loggedProfile.id,
        reference.dbCategory,
        inputData
      );
    }
    await updateAuthContext();
    toast.success(`${reference.title} updated!`);
  };

  const handleEditType = () => {
    if (editable === true) {
      return (
        <Input
          name={reference.dbCategory}
          className={` ${
            // Pasa la clase al componente Input
            categoryValue.length === 0 || categoryValue.length > 301
              ? "input--error"
              : ""
          }`}
          editable="string"
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
        />
      );
    }
  };

  return (
    <div className="event--category">
      <div className="event--category__img">
        <img
          className="event--category__icon"
          src={img}
          alt={`${reference.title} icon`}
        />
      </div>
      <div className="event--category__text">
        <h4 className="category--text__title">{reference.title}</h4>
        <div className="category--text-container">
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

          {editable &&
            (isEditable ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="category--text__icon--check"
                onClick={() => {
                  if (
                    categoryValue.length === 0 ||
                    categoryValue.length > 300
                  ) {
                    alert("The text must be between 1 and 300 characters");
                  } else {
                    updateProfileInfo(categoryValue);
                    setIsEditable(!isEditable);
                  }
                }}
              >
                <path d="M9.00004 20.4209L2.79004 14.2109L5.62004 11.3809L9.00004 14.7709L18.88 4.88086L21.71 7.71086L9.00004 20.4209Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="category--text__icon--edit"
                onClick={() => {
                  setIsEditable(!isEditable);
                }}
                role="button"
                aria-label="Toggle edit"
              >
                <path d="M20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87M3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25Z" />
              </svg>
            ))}
        </div>
      </div>
    </div>
  );
};
