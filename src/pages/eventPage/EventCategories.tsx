import { InfoCategoryEvent } from "../../components/infoCategoryEvent/InfoCategoryEvent";
import {
  normalizeDate,
  normalizePlaces,
  normalizeTime,
} from "../../functions/Functions";
import calendar from "../../imgs/eventPage/calendar.svg";
import time from "../../imgs/eventPage/time.svg";
import locationIcon from "../../imgs/eventPage/location.svg";
import tag from "../../imgs/eventPage/tag.svg";
import dog from "../../imgs/eventPage/dog-side.svg";
import availability from "../../imgs/eventPage/availability.svg";
import description from "../../imgs/profilePage/description.svg";
import { Timestamp } from "firebase/firestore";

interface EventCategoriesProps {
  dateTime: Timestamp;
  location: string;
  activity: "Social events" | "Outdoors" | "Walks" | "Private property" | "Any";
  breeds: string;
  places: number;
  eventDescription: string;
}

export const EventCategories = ({
  dateTime,
  location,
  activity,
  breeds,
  places,
  eventDescription,
}: EventCategoriesProps) => {
  return (
    <>
      <InfoCategoryEvent
        img={calendar}
        reference={{
          title: "Day",
          dbCategory: "dateTime",
        }}
        info={normalizeDate(dateTime.toDate())}
        editable=''
      />
      <InfoCategoryEvent
        img={time}
        reference={{
          title: "Start time",
          dbCategory: "dateTime",
        }}
        info={normalizeTime(dateTime.toDate())}
        editable=''
      />
      <InfoCategoryEvent
        img={locationIcon}
        reference={{
          title: "Location",
          dbCategory: "location",
        }}
        info={location}
        editable=''
      />
      <InfoCategoryEvent
        img={tag}
        reference={{
          title: "Activity",
          dbCategory: "activity",
        }}
        info={activity}
        editable=''
      />
      <InfoCategoryEvent
        img={dog}
        reference={{
          title: "Allowed breeds",
          dbCategory: "breeds",
        }}
        info={breeds}
        editable=''
      />
      <InfoCategoryEvent
        img={availability}
        reference={{
          title: "Availability",
          dbCategory: "profileIdAsisstant",
        }}
        info={normalizePlaces(places)}
        editable=''
      />
      <InfoCategoryEvent
        img={description}
        reference={{
          title: "Description",
          dbCategory: "eventDescription",
        }}
        info={eventDescription}
        editable=''
      />
    </>
  );
};
