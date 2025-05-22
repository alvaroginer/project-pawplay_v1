import { db } from "../../dataBase/firebase";
import {
  collection,
  addDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

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
import { toast, ToastContainer, Slide } from "react-toastify";

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
  const auth = getAuth();

  const handleSubmit = async () => {
    if (!auth.currentUser) {
      alert("Debes estar autenticado para crear un perfil.");
      return;
    }

    if (
      formData.name === "" ||
      formData.breed === "" ||
      formData.ownerName === "" ||
      formData.age === "" ||
      formData.gender === "" ||
      formData.size === "" ||
      formData.description === "" ||
      !selectedImage
    ) {
      alert("Please complete all fields and upload an image.");
    } else {
      await pushNewProfile();
      toast.success("Profile created");
    }
  };

  const uploadProfileImage = async (imageFile: File, profileId: string) => {
    const storage = getStorage();
    const imageRef = ref(storage, `profileImages/${profileId}`);
    await uploadBytes(imageRef, imageFile);
    return await getDownloadURL(imageRef);
  };

  const pushNewProfile = async () => {
    try {
      const profilesCollectionRef = collection(db, "profiles");
      const docRef = await addDoc(profilesCollectionRef, {
        profileName: formData.name,
        breed: formData.breed,
        age: Number(formData.age),
        sex: formData.gender,
        size: formData.size,
        profileBio: formData.description,
        profilePhoto: "",
      });

      const userId = getAuth().currentUser?.uid;
      if (!userId) throw new Error("No authenticated user found");

      const userDocRef = doc(db, "users", userId);

      await updateDoc(userDocRef, {
        profiles: arrayUnion(docRef.id),
      });

      if (selectedImage) {
        const imageUrl = await uploadProfileImage(selectedImage, docRef.id);
        const profileDocRef = doc(db, "profiles", docRef.id);
        await updateDoc(profileDocRef, { profilePhoto: imageUrl });
      }

      alert("Perfil creado con éxito");
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

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
          <Button
            className="primary"
            children="Publish profile"
            onClick={handleSubmit}
          />
          <ToastContainer transition={Slide} />
        </div>
      </div>
    </div>
  );
};
