import {
  dogBreedsType,
  eventTime,
  maximumPlaces,
  typeOfActivity,
  CreateEventProps,
  EventData,
  dogSizesType,
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
import { useNavigate } from "react-router";
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
import ruler from "../../imgs/profilePage/ruler.svg";
import "./CreateEvent.css";

export const CreateEvent = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { loggedProfile } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateEventProps>();
  const navigate = useNavigate();

  const handleImageFile = async (file: File) => {
    //La pasamos a dataUrl
    const dataUrl = await transformFileToDataUrl(file, setError, "eventPhoto");
    if (dataUrl === undefined) {
      setError("eventPhoto", {
        type: "manual",
        message: "An error ocurred by uploading the image. Try again.",
      });
    }
    return dataUrl;
  };

  const onSubmit: SubmitHandler<CreateEventProps> = async (formData) => {
    console.log("Datos en el form", formData);
    console.log("Errores en el form", errors);
    if (loggedProfile === null) return;

    try {
      //Comprobamos que no esté vacío
      if (!selectedImage) {
        setError("eventPhoto", {
          type: "manual",
          message: "You must upload an image.",
        });
        toast(`It's necessary to upload an image`);
        return;
      }

      console.log("esto es la imagen en el form", formData.eventPhoto);
      const imageUrl = await handleImageFile(selectedImage);
      if (!imageUrl) return;

      const validDate = transformToTimeStampDate(formData.day, setError);
      if (!validDate) return;

      //Creamos objeto de evento combinando los datos
      const newEventData: EventData = {
        id: "",
        userUid: loggedProfile.userUid,
        profileIdCreator: loggedProfile.id,
        profileIdAsisstant: [],
        eventTitle: formData.eventTitle,
        eventPhoto: imageUrl,
        eventDescription: formData.eventDescription,
        dateTime: validDate,
        location: formData.location,
        places: Number(formData.places),
        size: formData.size,
        activity: formData.activity,
        breeds: formData.breeds,
      };
      console.log("datos del evento", newEventData);

      //Cragamos los datos en la base de datos
      const eventId = await createEventDb(newEventData);

      //Creamos un tostify cuando el evento se sube correctamente
      toast(`Congratulations, you created the event ${formData.eventTitle}`);

      navigate(`/event/${eventId}`);
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
                <p>{"Upload an image of the event"}</p>
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
              name='eventPhoto'
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
        <p className='create-event__error-text'>
          {errors.eventPhoto && errors.eventPhoto.message}
        </p>
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
            errors={errors.eventTitle?.message}
            charLimit={20}
            name='eventTitle'
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
            name='day'
          />
          <FormField
            control={control}
            iconSrc={time}
            iconAlt='Event start icon'
            label='Start time'
            placeholder='Start time'
            editable='select'
            selectData={eventTime}
            rules={{
              required: "This field is necessary",
            }}
            errors={errors.time && errors.time.message}
            name='time'
          />
          <FormField
            control={control}
            iconSrc={location}
            iconAlt='Event location icon'
            label='Location'
            placeholder='Put the address of the event'
            editable='string'
            rules={{
              required: "This field is necessary",
            }}
            errors={errors.location && errors.location.message}
            name='location'
          />
          <FormField
            control={control}
            iconSrc={tag}
            iconAlt='Event activity icon'
            label='Type of activity'
            placeholder='Select the type of activity'
            editable='select'
            selectData={typeOfActivity}
            rules={{
              required: "This field is necessary",
            }}
            errors={errors.activity && errors.activity.message}
            name='activity'
          />
          <FormField
            control={control}
            iconSrc={allowedBreeds}
            iconAlt='Event allowed breeds icon'
            label='Allowed breeds'
            placeholder='Select allowed breeds'
            editable='select'
            selectData={dogBreedsType}
            rules={{
              required: "This field is necessary",
            }}
            errors={errors.breeds && errors.breeds.message}
            name='breeds'
          />
          <FormField
            control={control}
            iconSrc={ruler}
            iconAlt='Dog size icon'
            label='Allowed size'
            placeholder='Select allowed size'
            editable='select'
            selectData={dogSizesType}
            rules={{
              required: "This field is necessary",
            }}
            errors={errors.size && errors.size.message}
            name='size'
          />
          <FormField
            control={control}
            iconSrc={availability}
            iconAlt='Event availability icon'
            label='Availability'
            placeholder='Select the maxium places for the event'
            editable='select'
            selectData={maximumPlaces}
            rules={{
              required: "This field is necessary",
            }}
            errors={errors.places && errors.places.message}
            name='places'
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
                message: "Write a description of minimum 100 characters",
              },
            }}
            errors={errors.eventDescription && errors.eventDescription.message}
            name='eventDescription'
          />
          <div className='create-event__button-container'>
            <Button size='large' className='primary' children='Publish event' />
          </div>
        </div>
      </form>
    </div>
  );
};
