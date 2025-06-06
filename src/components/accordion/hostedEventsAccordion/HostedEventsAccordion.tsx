import { useState, useEffect } from "react";
import { EventData } from "../../../types";
import { getHostedEventsLimited } from "../../../dataBase/services/readFunctions";
import { toast } from "react-toastify";
import { Accordion } from "../Accordion";

export const HostedEventsAccordion = ({ profileId }: { profileId: string }) => {
  const [cardsContent, setCardsContent] = useState<EventData[]>();

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      if (!profileId) return;

      try {
        const hostedEvents = await getHostedEventsLimited(profileId);
        setCardsContent(hostedEvents);
      } catch {
        console.error("Error to upload hosted Events");
        toast.error("Ups! An error ocurred while uploading your hosted events");
      }
    };
    fetchUpcomingEvents();
  }, [profileId]);

  if (!cardsContent) return;

  return (
    <Accordion text="Hosted Events" eventsData={cardsContent} url="hosted" />
  );
};
