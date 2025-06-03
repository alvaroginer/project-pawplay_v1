import { useState, useEffect } from "react";
import { EventData } from "../../../types";
import { getUpcomingEventsLimited } from "../../../dataBase/services/readFunctions";
import { toast } from "react-toastify";
import { Accordion } from "../Accordion";

export const UpcomingEventsAccordion = ({
  profileId,
}: {
  profileId: string;
}) => {
  const [cardsContent, setCardsContent] = useState<EventData[]>();

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      if (!profileId) return;

      try {
        const upcomingEvents = await getUpcomingEventsLimited(profileId);
        setCardsContent(upcomingEvents);
      } catch {
        console.error("Error to upload upcoming Events");
        toast.error(
          "Ups! An error ocurred while uploading your upcoming events"
        );
      }
    };
    fetchUpcomingEvents();
  }, [profileId]);

  if (!cardsContent) return;

  return (
    <Accordion
      text="Upcoming Events"
      eventsData={cardsContent}
      url="upcoming"
    />
  );
};
