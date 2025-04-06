import { Card } from "./components/card/card";
import { CardData } from "./components/card/card";
import { useEffect, useState } from "react";
import { Button } from "./components/button/Button";
import { Sidebar } from "./components/sidebar/Sidebar";
import "./App.css";
import "./index.css";

export interface FilterProps {
  activities: Record<string, boolean>;
  breed: Record<string, boolean>;
  size: Record<string, boolean>;
  date: Record<number, boolean>;
}

//El filtro se creará dinamicamente a partir de los datos que proprcionen las cards
//Existirá un único useState para el filtro que tendrá la estructura de FilterProps
// cada propiedad de Filter prop tendrá un objeto con el nombre de la categoria y un estado de verdadero falso que marcará si es un requisito de filtro
// el componente sidebar recibirá la estructura de filterprops

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
        <div className="filter-button display--flex">
          <p>Filters</p>
          <img src="imgs/filter.svg" alt="Filter Icon" />
        </div>
      </div>
      <section className="grid">
        {eventsList.map((event: CardData) => {
          return <Card key={event.id} event={event} />;
        })}
      </section>
      <Sidebar filterData={} />
    </>
  );
}

export default App;
