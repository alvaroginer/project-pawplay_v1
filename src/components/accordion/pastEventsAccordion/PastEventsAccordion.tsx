import { useState, useEffect } from "react";
import { EventData } from "../../../types";
import { getPastEventsLimited } from "../../../dataBase/services/readFunctions";
import { toast } from "react-toastify";
import { Accordion } from "../Accordion";

export const PastEventsAccordion = ({ profileId }: { profileId: string }) => {
  const [cardsContent, setCardsContent] = useState<EventData[]>();

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      if (!profileId) return;

      try {
        const pastEvents = await getPastEventsLimited(profileId);
        setCardsContent(pastEvents);
      } catch {
        console.error("Error to upload past Events");
        toast.error("Ups! An error ocurred while uploading your past events");
      }
    };
    fetchUpcomingEvents();
  }, [profileId]);

  if (!cardsContent) return;

  return (
    <Accordion
      defaultOpen={true}
      text='Past Events'
      eventsData={cardsContent}
      url='past'
    />
  );
};
