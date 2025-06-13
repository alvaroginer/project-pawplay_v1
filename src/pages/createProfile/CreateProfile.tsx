import {
  dogBreedsType,
  dogSizesType,
  dogGenderType,
  dogAgeType,
  CreateProfileProps,
  ProfileData,
} from "../../types";
import { createProfileDb } from "../../dataBase/services/createFunctions";
import { FormField } from "../../components/formField/FormField";
import { Button } from "../../components/button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useContext } from "react";
import { transformFileToDataUrl } from "../../functions/Functions";
import { useNavigate } from "react-router";
import { AuthContext } from "../../hooks/auth/AuthContext";
import { updateUserProfiles } from "../../dataBase/services/updateFunctions";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import gender from "../../imgs/profilePage/gender-transgender.svg";
import medal from "../../imgs/profilePage/medal-outline.svg";
import ruler from "../../imgs/profilePage/ruler.svg";
import dog from "../../imgs/profilePage/dog.svg";
import timer from "../../imgs/profilePage/timer-sand.svg";
import description from "../../imgs/profilePage/description.svg";
import "./CreateProfile.css";

export const CreateProfile = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, login } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateProfileProps>();
  const navigate = useNavigate();

  const handleImageFile = async (file: File) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB

      //La pasamos a dataUrl
      const dataUrl = await transformFileToDataUrl(
        compressedFile,
        setError,
        "profilePhoto"
      );

      //Comprobamos que no haya habido ningún error al pasar la imagen a url
      if (dataUrl === undefined) {
        setError("profilePhoto", {
          type: "manual",
          message: "An error ocurred by uploading the image. Try again.",
        });
      }
      return dataUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<CreateProfileProps> = async (formData) => {
    if (!user) return;
    setIsLoading(true);

    try {
      if (!selectedImage) {
        setError("profilePhoto", {
          type: "manual",
          message: "You must upload an image.",
        });
        setIsLoading(false);
        toast(`It's necessary to upload an image`);
        return;
      }

      const imageUrl = await handleImageFile(selectedImage);
      if (!imageUrl) {
        setIsLoading(false);
        return;
      }

      const newProfileData: ProfileData = {
        userUid: user.uid,
        id: "",
        profileName: formData.profileName,
        profilePhoto: imageUrl,
        profileBio: formData.profileBio,
        age: formData.age,
        breed: formData.breed,
        size: formData.size,
        gender: formData.gender,
        likedEvents: [],
      };

      const profileId = await createProfileDb(newProfileData);
      await updateUserProfiles(user.uid, profileId);
      login(user, { ...newProfileData, id: profileId });

      toast.success(
        `Congratulations! You’ve created the profile for ${formData.profileName} and are now logged in.`
      );

      navigate(`/profile/${profileId}`);
    } catch (error: any) {
      console.log(`Firebase error (${error.code}): ${error.message}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='create-profile'>
          <div className='create-profile__image-section'>
            <div className='create-profile__image-wrapper'>
              {!selectedImage && (
                <div className='create-profile__upload-instructions'>
                  <p>{"Upload an image of your dog"}</p>
                  <label
                    htmlFor='file-input'
                    className='create-profile__upload-button'
                  >
                    Choose a file
                  </label>
                </div>
              )}
              <input
                id='file-input'
                type='file'
                accept='image/webp,image/jpeg,image/png'
                className='create-profile__file-input'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedImage(e.target.files[0]);
                  }
                }}
              />
              {selectedImage && (
                <label
                  htmlFor='file-input'
                  className='create-profile__image-label'
                >
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt='Preview'
                    className='create-profile__image-preview'
                  />
                </label>
              )}
            </div>
            <p className='create-profile__image--text-error'>
              {errors.profilePhoto && errors.profilePhoto.message}
            </p>
          </div>
          <div className='create-profile__form'>
            <div className='create-profile__field-group no-padding-top'>
              <FormField
                control={control}
                iconSrc={dog}
                iconAlt='Dog name icon'
                label="Dog's name"
                placeholder='Write the name of your dog'
                editable='string'
                rules={{
                  required: "Dog name is necessary",
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,30}$/,
                    message: "Only letters (2–30 characters)",
                  },
                }}
                errors={errors.profileName && errors.profileName.message}
                name='profileName'
                charLimit={30}
              />
            </div>
            <div className='create-profile__field-group'>
              <FormField
                control={control}
                iconSrc={medal}
                iconAlt='Dog breed icon'
                label='Breed'
                placeholder='Select the breed of your dog'
                editable='select'
                selectData={dogBreedsType}
                rules={{
                  required: "The breed of your dog is required",
                }}
                errors={errors.breed && errors.breed.message}
                name='breed'
              />
            </div>
            <div className='create-profile__field-group'>
              <FormField
                control={control}
                iconSrc={timer}
                iconAlt='Dog age icon'
                label='Age'
                placeholder='Select the age of your dog'
                editable='select'
                selectData={dogAgeType}
                rules={{
                  required: "The age of your dog is required",
                }}
                errors={errors.age && errors.age.message}
                name='age'
              />
              <FormField
                control={control}
                iconSrc={gender}
                iconAlt='Dog gender icon'
                label='Gender'
                placeholder="Select your dog's gender"
                editable='select'
                selectData={dogGenderType}
                rules={{
                  required: "The gender of your dog is required",
                }}
                errors={errors.gender && errors.gender.message}
                name='gender'
              />
              <FormField
                control={control}
                iconSrc={ruler}
                iconAlt='Dog size icon'
                label='Size'
                placeholder='Select the size of your dog'
                editable='select'
                selectData={dogSizesType}
                rules={{
                  required: "The size of your dog is required",
                }}
                errors={errors.size && errors.size.message}
                name='size'
              />
            </div>
            <div className='create-profile__field-group'>
              <FormField
                control={control}
                iconSrc={description}
                iconAlt='Dog description icon'
                label='Description'
                placeholder='Description of your dog'
                editable='string'
                rules={{
                  required: "Description is necessary",
                  pattern: {
                    value: /^.{100,}$/,
                    message: "Write a description of minimum 100 characters",
                  },
                }}
                errors={errors.profileBio && errors.profileBio.message}
                name='profileBio'
              />
            </div>
            <div className='create-profile__button-container'>
              <Button
                className='primary'
                onClick={handleSubmit}
                type='submit'
                disabled={isLoading}
              >
                Publish profile
                {isLoading && <span className='loader'></span>}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
