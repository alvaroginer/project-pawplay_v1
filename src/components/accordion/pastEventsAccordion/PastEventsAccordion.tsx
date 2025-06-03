import { useState, useEffect } from "react";
import { EventData } from "../../../types";
import { getFavouriteEventsLimited } from "../../../dataBase/services/readFunctions";
import { toast } from "react-toastify";
import { Accordion } from "../Accordion";

export const PastEventsAccordion = ({
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
        console.error("Error to upload your past Events");
        toast.error("Ups! An error ocurred while uploading your past events");
      }
    };
    fetchUpcomingEvents();
  }, [likedEvents]);

  if (!cardsContent) return;

  return (
    <Accordion text="Favourite Events" eventsData={cardsContent} url="past" />
  );
};
