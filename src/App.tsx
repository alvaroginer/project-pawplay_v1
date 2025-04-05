import { Card } from "./components/card/card";
import { CardData } from "./components/card/card";
import { useEffect, useState } from "react";
import { Button } from "./components/button/Button";
import "./App.css";
import "./index.css";

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
      <div className="filter-container">
        <input
          type="text"
          className="searchbar"
          placeholder="Search the event you want to go"
        />
        <div className="filter-button--container">
          <Button className="btn btn--terciary" text="Social Event" />
          <Button className="btn btn--terciary" text="Outdoors" />
          <Button className="btn btn--terciary" text="Walks" />
          <Button className="btn btn--terciary" text="Small Dogs" />
          <Button className="btn btn--terciary" text="Social Event" />
          <Button className="btn btn--terciary" text="Social Event" />
        </div>
      </div>
      <section className="grid">
        {eventsList.map((event: CardData) => {
          return <Card key={event.id} event={event} />;
        })}
      </section>
    </>
  );
}

export default App;
