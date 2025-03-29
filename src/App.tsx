import "./App.css";
import "./index.css";
import { Card, CardData } from "./components/card/card";
import { useEffect, useState } from "react";

function App() {
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
      {eventsList.map((event: CardData) => {
        return <Card key={event.id} event={event} />;
      })}
    </>
  );
}

export default App;
