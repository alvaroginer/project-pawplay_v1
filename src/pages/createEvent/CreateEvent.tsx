import {
  dogBreedsType,
  eventTime,
  maximumPlaces,
  typeOfActivity,
  CreateEventProps,
  EventData,
  ImageFileInput,
} from "../../types";
import {
  transformToTimeStampDate,
  transformFileToDataUrl,
} from "../../functions/Functions";
import { Button } from "../../components/button/Button";
import { FormField } from "../../components/formField/FormField";
import { useForm, SubmitHandler } from "react-hook-form";
import { createEventDb } from "../../dataBase/services/createFunctions";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import title from "../../imgs/eventPage/title.svg";
import calendar from "../../imgs/eventPage/calendar.svg";
import time from "../../imgs/eventPage/time.svg";
import location from "../../imgs/eventPage/location.svg";
import tag from "../../imgs/eventPage/tag.svg";
import allowedBreeds from "../../imgs/eventPage/dog-side.svg";
import availability from "../../imgs/eventPage/availability.svg";
import description from "../../imgs/profilePage/description.svg";
import "./CreateEvent.css";

export const CreateEvent = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { loggedProfile } = useContext(AuthContext);
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateEventProps>();

  const handleImageFile = async (inputData: ImageFileInput) => {
    const file = inputData.image[0];

    //Comprobamos que no esté vacío
    if (!file) return null;

    if (inputData.image.length > 1) {
      setError("eventPhoto", {
        type: "manual",
        message: "Upload only one file",
      });
      return null;
    }

    //Hacemos que se visualice en el selector
    setSelectedImage(file);

    //La pasamos a dataUrl
    const dataUrl = await transformFileToDataUrl(file, setError, "eventPhoto");
    if (dataUrl === null) {
      setError("eventPhoto", {
        type: "manual",
        message: "An error ocurred by uploading the image. Try again.",
      });
    }
    return dataUrl;
  };

  const onSubmit: SubmitHandler<CreateEventProps> = async (formData) => {
    if (loggedProfile === null) return;

    try {
      if (!formData.eventPhoto) return;
      const imageUrl = await handleImageFile({ image: formData.eventPhoto });
      if (!imageUrl) return;

      //Creamos objeto de evento combinando los datos
      const newEventData: EventData = {
        id: "",
        userUid: loggedProfile.userUid,
        profileIdCreator: loggedProfile.id,
        profileIdAsisstant: [],
        eventTitle: formData.eventTitle,
        eventPhoto: imageUrl,
        eventDescription: formData.eventDescription,
        dateTime: transformToTimeStampDate(formData.day),
        location: formData.location,
        places: Number(formData.places),
        size: formData.size,
        activity: formData.activity,
        breeds: formData.breeds,
      };

      //Cragamos los datos en la base de datos
      await createEventDb(newEventData);

      //Creamos un tostify cuando el evento se sube correctamente
      toast(`Congratulations, you created the event ${formData.eventTitle}`);
    } catch (error: any) {
      console.log(`Firebase error (${error.code}): ${error.message}`);
    }
  };

  return (
    <div className='create-event'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='create-event__image-section'>
          <div className='create-event__image-wrapper'>
            {!selectedImage && (
              <div className='create-event__upload-instructions'>
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
              {...register("eventPhoto", { required: "Image is required" })}
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
                  className='create-event__image-preview'
                />
              </label>
            )}
          </div>
        </div>
        <div className='create-event__form'>
          <FormField
            control={control}
            iconSrc={title}
            iconAlt='Event title icon'
            label='Title'
            placeholder='Title of the event'
            editable='string'
            rules={{
              required: "Title is necessary",
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,20}$/,
                message: "Only letters (2–20 characters)",
              },
            }}
            errors={errors.eventTitle && errors.eventTitle.message}
          />
          <FormField
            control={control}
            iconSrc={calendar}
            iconAlt='Event day icon'
            label='Day'
            placeholder='Day / Month / Year'
            editable='string'
            rules={{
              required: "Day date is necessary",
              pattern: {
                value: /^([0][1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                message: "Day / Month / Year",
              },
            }}
            errors={errors.day && errors.day.message}
          />
          <FormField
            control={control}
            iconSrc={time}
            iconAlt='Event start icon'
            label='Start time'
            placeholder='Start time'
            editable='select'
            selectData={eventTime}
            required='Start time is necessary'
            errors={errors.time && errors.time.message}
          />
          <FormField
            control={control}
            iconSrc={location}
            iconAlt='Event location icon'
            label='Location'
            placeholder='Put the address of the event'
            editable='string'
            required='Location is necessary'
            errors={errors.location && errors.location.message}
          />
          <FormField
            control={control}
            iconSrc={tag}
            iconAlt='Event activity icon'
            label='Type of activity'
            placeholder='Select the type of activity'
            editable='select'
            selectData={typeOfActivity}
            required='Activity type is necessary'
            errors={errors.activity && errors.activity.message}
          />
          <FormField
            control={control}
            iconSrc={allowedBreeds}
            iconAlt='Event allowed breeds icon'
            label='Allowed breeds'
            placeholder='Select allowed breeds'
            editable='select'
            selectData={dogBreedsType}
            required='Allowed breeds is necessary'
            errors={errors.breeds && errors.breeds.message}
          />
          <FormField
            control={control}
            iconSrc={availability}
            iconAlt='Event availability icon'
            label='Availability'
            placeholder='Select the maxium places for the event'
            editable='select'
            selectData={maximumPlaces}
            required='Set the maximum places'
            errors={errors.places && errors.places.message}
          />
          <FormField
            control={control}
            iconSrc={description}
            iconAlt='Event description icon'
            label='Description'
            placeholder='Description of the event'
            editable='string'
            rules={{
              required: "Description is necessary",
              pattern: {
                value: /^.{100,}$/,
                message: "Day / Month / Year",
              },
            }}
            errors={errors.eventDescription && errors.eventDescription.message}
          />
          <div className='create-event__button-container'>
            <Button size='large' className='primary' children='Publish event' />
          </div>
        </div>
      </form>
    </div>
  );
};
