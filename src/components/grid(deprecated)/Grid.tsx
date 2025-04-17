import { Card } from "../card/Card";
import { CardData } from "../card/Card";
import { useEffect, useState } from "react";

export const Grid = () => {
  const [eventsList, setEventsList] = useState<CardData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/events.json");
        if (!response.ok) {
          throw new Error("Error al cargar el JSON");
        }
        const data = await response.json();
        setEventsList(data.events);
        localStorage.setItem("events", JSON.stringify(data.events));
      } catch (error) {
        console.error("Hubo un problema con la carga del JSON:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <section className="grid">
        {eventsList.map((event: CardData) => {
          return <Card key={event.id} event={event} />;
        })}
      </section>
    </>
  );
};
