import {
  dogBreedsType,
  dogSizesType,
  dogGenderType,
  dogAgeType,
  CreateProfileProps,
  ImageFileInput,
  ProfileData,
} from "../../types";
import { createProfileDb } from "../../dataBase/services/createFunctions";
import { FormField } from "../../components/formField/FormField";
import { Button } from "../../components/button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useContext } from "react";
import { transformFileToDataUrl } from "../../functions/Functions";
import { AuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";
import gender from "../../imgs/profilePage/gender-transgender.svg";
import medal from "../../imgs/profilePage/medal-outline.svg";
import ruler from "../../imgs/profilePage/ruler.svg";
import dog from "../../imgs/profilePage/dog.svg";
import timer from "../../imgs/profilePage/timer-sand.svg";
import description from "../../imgs/profilePage/description.svg";
import "./CreateProfile.css";

export const CreateProfile = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { user } = useContext(AuthContext);
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateProfileProps>();

  const handleImageFile = async (inputData: ImageFileInput) => {
    const file = inputData.image[0];

    //Comprobamos que no esté vacío
    if (!file) return null;

    if (inputData.image.length > 1) {
      setError("profilePhoto", {
        type: "manual",
        message: "Upload only one file",
      });
      return null;
    }

    //Hacemos que se visualice en el selector
    setSelectedImage(file);

    //La pasamos a dataUrl
    const dataUrl = await transformFileToDataUrl(
      file,
      setError,
      "profilePhoto"
    );
    if (dataUrl === null) {
      setError("profilePhoto", {
        type: "manual",
        message: "An error ocurred by uploading the image. Try again.",
      });
    }
    return dataUrl;
  };

  const onSubmit: SubmitHandler<CreateProfileProps> = async (formData) => {
    if (!user) return;

    try {
      if (!formData.profilePhoto) return;
      const imageUrl = await handleImageFile({ image: formData.profilePhoto });
      if (!imageUrl) return;

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

      await createProfileDb(newProfileData);

      toast(
        `Congratulations, you created a dog profile for ${formData.profileName}`
      );
    } catch (error: any) {
      console.log(`Firebase error (${error.code}): ${error.message}`);
    }
  };

  return (
    <div className='create-profile'>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("profilePhoto", { required: "Image is required" })}
              id='file-input'
              type='file'
              accept='image/webp,image/jpeg,image/png'
              className='create-profile__file-input'
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
                  value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,20}$/,
                  message: "Only letters (2–20 characters)",
                },
              }}
              errors={errors.profileName && errors.profileName.message}
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
              required='The breed of your dog is required'
              errors={errors.breed && errors.breed.message}
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
              required='The age of your dog is required'
              errors={errors.age && errors.age.message}
            />
            <FormField
              control={control}
              iconSrc={gender}
              iconAlt='Dog gender icon'
              label='Gender'
              placeholder="Select your dog's gender"
              editable='select'
              selectData={dogGenderType}
              required='The gender of your dog is required'
              errors={errors.gender && errors.gender.message}
            />
            <FormField
              control={control}
              iconSrc={ruler}
              iconAlt='Dog size icon'
              label='Size'
              placeholder='Select the size of your dog'
              editable='select'
              selectData={dogSizesType}
              required='The size of your dog is required'
              errors={errors.size && errors.size.message}
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
                  message: "Day / Month / Year",
                },
              }}
              errors={errors.profileBio && errors.profileBio.message}
            />
          </div>
          <div className='create-profile__button-container'>
            <Button
              size='large'
              className='primary'
              children='Publish profile'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
