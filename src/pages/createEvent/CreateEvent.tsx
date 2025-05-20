import {
  dogBreedsType,
  eventTime,
  maximumPlaces,
  typeOfActivity,
  CreateEventProps,
  EventData,
} from "../../types";
import { Button } from "../../components/button/Button";
import { FormField } from "../../components/formField/FormField";
import { useForm, SubmitHandler } from "react-hook-form";
import { createEventDb } from "../../dataBase/services/createFunctions";
import { toast } from "react-toastify";
import { useContext } from "react";
// import { Button } from "../../components/button/Button";
import title from "../../imgs/eventPage/title.svg";
import calendar from "../../imgs/eventPage/calendar.svg";
import time from "../../imgs/eventPage/time.svg";
import location from "../../imgs/eventPage/location.svg";
import tag from "../../imgs/eventPage/tag.svg";
import allowedBreeds from "../../imgs/eventPage/dog-side.svg";
import availability from "../../imgs/eventPage/availability.svg";
import description from "../../imgs/profilePage/description.svg";

import "./CreateEvent.css";
import { useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
const {
  register,
  handleSubmit,
  setError,
  formState: { errors },
} = useForm<CreateEventProps>();

export const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    activityType: "",
    description: "",
    time: "",
    day: "",
    availability: "",
    organisator: "",
    allowedBreeds: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { loggedProfile } = useContext(AuthContext);

  const onSubmit: SubmitHandler<CreateEventProps> = async (formData) => {
    try {
      //Creamos objeto de evento combinando los datos
      const newEventData: EventData = {
        id: "",
        userUid: loggedProfile.uid,
        profileIdCreator: loggedProfile.id,
        profileIdAsisstant: [],
        eventTitle: formData.eventTitle,
        eventPhoto: formData.eventPhoto,
        eventDescription: formData.eventDescription,
        dateTime: "",
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
              id='file-input'
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedImage(file);
                }
              }}
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
            iconSrc={title}
            iconAlt='Event title icon'
            label='Title'
            placeholder='Title of the event'
            editable='string'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <FormField
            iconSrc={calendar}
            iconAlt='Event day icon'
            label='Day'
            placeholder='Month / Day / Year'
            editable='string'
            // onChange={(e) => setFormData({ ...formData, day: e.target.value })}
          />
          <FormField
            iconSrc={time}
            iconAlt='Event start icon'
            label='Start time'
            placeholder='Start time'
            editable='select'
            // onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            selectData={eventTime}
            value={formData.time}
          />
          <FormField
            iconSrc={location}
            iconAlt='Event location icon'
            label='Location'
            placeholder='Put the adress of the event'
            editable='string'
            // onChange={(e) =>
            //   setFormData({ ...formData, location: e.target.value })
            // }
          />
          <FormField
            iconSrc={tag}
            iconAlt='Event activity icon'
            label='Type of activity'
            placeholder='Select the type of activity'
            editable='select'
            // onChange={(e) =>
            //   setFormData({ ...formData, activityType: e.target.value })
            // }
            selectData={typeOfActivity}
            value={formData.activityType}
          />
          <FormField
            iconSrc={allowedBreeds}
            iconAlt='Event allowed breeds icon'
            label='Allowed breeds'
            placeholder='Select allowed breeds'
            editable='select'
            // onChange={(e) =>
            //   setFormData({ ...formData, allowedBreeds: e.target.value })
            // }
            selectData={dogBreedsType}
            value={formData.allowedBreeds}
          />
          <FormField
            iconSrc={availability}
            iconAlt='Event availability icon'
            label='Availability'
            placeholder='Select the maxium places for the event'
            editable='select'
            // onChange={(e) =>
            //   setFormData({ ...formData, availability: e.target.value })
            // }
            selectData={maximumPlaces}
            value={formData.availability}
          />
          <FormField
            iconSrc={description}
            iconAlt='Event description icon'
            label='Description'
            placeholder='Description of the event'
            editable='string'
            // onChange={(e) =>
            //   setFormData({ ...formData, description: e.target.value })
            // }
          />
          <div className='create-event__button-container'>
            <Button size='large' className='primary' children='Publish event' />
          </div>
        </div>
      </form>
    </div>
  );
};
