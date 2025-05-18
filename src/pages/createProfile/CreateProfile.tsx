import {
  dogBreedsType,
  dogSizesType,
  dogGenderType,
  dogAgeType,
} from "../../types";

import { FormField } from "../../components/formField/FormField";
import { Button } from "../../components/button/Button";

import account from "../../imgs/profilePage/account-outline.svg";
import gender from "../../imgs/profilePage/gender-transgender.svg";
import medal from "../../imgs/profilePage/medal-outline.svg";
import ruler from "../../imgs/profilePage/ruler.svg";
import dog from "../../imgs/profilePage/dog.svg";
import timer from "../../imgs/profilePage/timer-sand.svg";
import description from "../../imgs/profilePage/description.svg";
import "./CreateProfile.css";
import { useState } from "react";

export const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    ownerName: "",
    age: "",
    gender: "",
    size: "",
    description: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <div className="create-profile">
      <div className="create-profile__image-section">
        <div className="create-profile__image-wrapper">
          {!selectedImage && (
            <div className="create-profile__upload-instructions">
              <p>{"Upload an image of your dog"}</p>
              <label
                htmlFor="file-input"
                className="create-profile__upload-button"
              >
                Choose a file
              </label>
            </div>
          )}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedImage(file);
              }
            }}
            className="create-profile__file-input"
          />
          {selectedImage && (
            <label htmlFor="file-input" className="create-profile__image-label">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="create-profile__image-preview"
              />
            </label>
          )}
        </div>
      </div>
      <div className="create-profile__form">
        <div className="create-profile__field-group no-padding-top">
          <FormField
            iconSrc={dog}
            iconAlt="Dog name icon"
            label="Dog's name"
            placeholder="Write the name of your dog"
            editable="string"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="create-profile__field-group">
          <FormField
            iconSrc={medal}
            iconAlt="Dog breed icon"
            label="Breed"
            placeholder="Select the breed of your dog"
            editable="select"
            onChange={(e) =>
              setFormData({ ...formData, breed: e.target.value })
            }
            selectData={dogBreedsType}
            value={formData.breed}
          />
        </div>
        <div className="create-profile__field-group">
          <FormField
            iconSrc={account}
            iconAlt="Owner name icon"
            label="Owner's name"
            placeholder="Write your name"
            editable="string"
            onChange={(e) =>
              setFormData({ ...formData, ownerName: e.target.value })
            }
          />
        </div>
        <div className="create-profile__field-group">
          <FormField
            iconSrc={timer}
            iconAlt="Dog age icon"
            label="Age"
            placeholder="Select the age of your dog"
            editable="select"
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            selectData={dogAgeType}
            value={formData.age}
          />
          <FormField
            iconSrc={gender}
            iconAlt="Dog gender icon"
            label="Gender"
            placeholder="Select your dog's gender"
            editable="select"
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            selectData={dogGenderType}
            value={formData.gender}
          />
          <FormField
            iconSrc={ruler}
            iconAlt="Dog size icon"
            label="Size"
            placeholder="Select the size of your dog"
            editable="select"
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            selectData={dogSizesType}
            value={formData.size}
          />
        </div>
        <div className="create-profile__field-group">
          <FormField
            iconSrc={description}
            iconAlt="Dog description icon"
            label="Description"
            placeholder="Description of your dog"
            editable="string"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="create-profile__button-container">
          <Button size="large" className="primary" children="Create profile" />
        </div>
      </div>
    </div>
  );
};
