import { FormLayout } from "../../components/formLayout/FormLayout";
import { useState } from "react";
import {
  Field,
  dogGenderType,
  dogAgeType,
  dogBreedsType,
  dogSizesType,
} from "../../types";
import "./CreateProfile.css";

export const CreateProfile = () => {
  const [formData, setFormData] = useState({
    ownersName: "",
    dogsName: "",
    breed: "",
    age: "",
    gender: "",
    size: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fields: Field[] = [
    {
      label: "Owner's name",
      name: "ownersName",
      placeholder: "Your name",
      value: formData.ownersName,
      onChange: handleChange,
      editable: "string",
    },
    {
      label: "Dog's name",
      name: "dogsName",
      placeholder: "The name of your dog",
      value: formData.dogsName,
      onChange: handleChange,
      editable: "string",
    },
    {
      label: "Breed",
      name: "breed",
      placeholder: "Select the breed of your dog",
      value: formData.breed,
      onChange: handleChange,
      editable: "select",
      selectData: dogBreedsType,
    },
    {
      label: "Age",
      name: "age",
      placeholder: "Select the age of your dog",
      value: formData.age,
      onChange: handleChange,
      editable: "select",
      selectData: dogAgeType,
    },
    {
      label: "Gender",
      name: "gender",
      placeholder: "Your dog's gender",
      value: formData.gender,
      onChange: handleChange,
      editable: "select",
      selectData: dogGenderType,
    },
    {
      label: "Size",
      name: "size",
      placeholder: "Select your dog's size",
      value: formData.size,
      onChange: handleChange,
      editable: "select",
      selectData: dogSizesType,
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Description of your dog",
      value: formData.description,
      onChange: handleChange,
      editable: "string",
    },
  ];
  return (
    <>
      <div className="container">
        <FormLayout
          imageTitle="Upload an image of your dog"
          title="Fill the information to create your dog's profile"
          fields={fields}
          formData={formData}
          // onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};
