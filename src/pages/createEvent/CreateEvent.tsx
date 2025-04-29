import { FormLayout } from "../../components/formLayout/FormLayout";
import { useState } from "react";
import "./CreateEvent.css";

export const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    activityType: "",
    description: "",
    time: "",
    day: "",
    places: "",
    organisator: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fields = [
    {
      label: "Title",
      name: "title",
      placeholder: "Title of the event",
      value: formData.title,
      onChange: handleChange,
    },
    {
      label: "Location",
      name: "location",
      placeholder: "Put the adress of the event",
      value: formData.location,
      onChange: handleChange,
    },
    {
      label: "Type of activity",
      name: "activityType",
      placeholder: "Select the type of the activity",
      value: formData.activityType,
      onChange: handleChange,
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Description of the event",
      value: formData.description,
      onChange: handleChange,
    },
    {
      label: "Start time and end time",
      name: "time",
      placeholder: "Start / End",
      value: formData.time,
      onChange: handleChange,
    },
    {
      label: "Day",
      name: "day",
      placeholder: "Month / Day / Year",
      value: formData.day,
      onChange: handleChange,
    },
    {
      label: "Maximum places",
      name: "places",
      placeholder: "Maximum places for the event",
      value: formData.places,
      onChange: handleChange,
    },
    {
      label: "Organisator name",
      name: "organisator",
      placeholder: "Put the name of the organisator",
      value: formData.organisator,
      onChange: handleChange,
    },
  ];

  return (
    <div className="container">
      <FormLayout
        title="Fill the information to create an event"
        fields={fields}
        formData={formData}
        onChange={handleChange}
        // onSubmit={handleSubmit}
      />
    </div>
  );
};
