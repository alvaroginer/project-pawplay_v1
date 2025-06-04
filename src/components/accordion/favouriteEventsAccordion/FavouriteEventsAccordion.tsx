import { useState, useEffect } from "react";
import { EventData } from "../../../types";
import { getFavouriteEventsLimited } from "../../../dataBase/services/readFunctions";
import { toast } from "react-toastify";
import { Accordion } from "../Accordion";

export const FavouriteEventsAccordion = ({
  likedEvents,
}: {
  likedEvents: string[];
}) => {
  const [cardsContent, setCardsContent] = useState<EventData[]>();

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      if (!likedEvents) return;

      try {
        const favouriteEvents = await getFavouriteEventsLimited(likedEvents);
        setCardsContent(favouriteEvents);
      } catch {
        console.error("Error to upload your favourite Events");
        toast.error(
          "Ups! An error ocurred while uploading your favourite events"
        );
      }
    };
    fetchUpcomingEvents();
  }, [likedEvents]);

  if (!cardsContent) return;

  return (
    <Accordion
      text='Favourite Events'
      eventsData={cardsContent}
      url='favourites'
    />
  );
};
