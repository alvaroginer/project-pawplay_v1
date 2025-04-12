import { Card } from "./components/card/card";
import { CardData } from "./components/card/card";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./components/button/Button";
import { Sidebar } from "./components/sidebar/Sidebar";
import "./App.css";
import "./index.css";

export interface FilterProps {
  activities: Record<string, boolean>;
  breeds: Record<string, boolean>;
  size: Record<string, boolean>;
  date: Record<number, boolean>;
}

//El filtro se creará dinamicamente a partir de los datos que proprcionen las cards
//Existirá un único useState para el filtro que tendrá la estructura de FilterProps
// cada propiedad de Filter prop tendrá un objeto con el nombre de la categoria y un estado de verdadero falso que marcará si es un requisito de filtro
// el componente sidebar recibirá la estructura de filterprops

function App() {
  const [eventsList, setEventsList] = useState<CardData[]>([]);
  const [filterParams, setFilterParams] = useState<FilterProps>({
    activities: {},
    breeds: {},
    size: {},
    date: {},
  });
  const [sidebarDisplay, setSidebarDisplay] = useState<boolean>(false);

  //Llamada al archivo json
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

  //Función de filtrado, cambiar por un useMemo
  // useEffect(() => {
  //   setFilteredEventList([...eventsList]);

  //   if (Object.values(filterParams.activities).includes(true)) {
  //     const activeCategorys: string[] = [];
  //     Object.keys(filterParams.activities).forEach((activity) => {
  //       if (filterParams.activities[activity] === true) {
  //         activeCategorys.push(activity);
  //       }
  //     });
  //     setFilteredEventList((prevFilteredList) =>
  //       prevFilteredList.filter((card) =>
  //         activeCategorys.includes(card.activity)
  //       )
  //     );
  //   }

  //   if (Object.values(filterParams.breeds).includes(true)) {
  //     const activeCategorys: string[] = [];
  //     Object.keys(filterParams.breeds).forEach((breed) => {
  //       if (filterParams.breeds[breed] === true) {
  //         activeCategorys.push(breed);
  //       }
  //     });
  //     setFilteredEventList((prevFilteredList) =>
  //       prevFilteredList.filter((card) => activeCategorys.includes(card.breed))
  //     );
  //   }

  //   if (Object.values(filterParams.size).includes(true)) {
  //     const activeCategorys: string[] = [];
  //     Object.keys(filterParams.size).forEach((dogSize) => {
  //       if (filterParams.size[dogSize] === true) {
  //         activeCategorys.push(dogSize);
  //       }
  //     });
  //     setFilteredEventList((prevFilteredList) =>
  //       prevFilteredList.filter((card) => activeCategorys.includes(card.size))
  //     );
  //   }
  // }, [filterParams, eventsList]);

  //Creamos dinámicamente el useState de los filtros, alo mejor se puede cambiar por un useMemo
  useEffect(() => {
    let activityList: Record<string, boolean> = {};
    let breedList: Record<string, boolean> = {};
    let sizeList: Record<string, boolean> = {};
    eventsList.forEach((eventCard) => {
      const { activity, breed, size } = eventCard;

      if (!activityList[activity]) {
        activityList = { ...activityList, [activity]: false };
      }

      if (!breedList[breed]) {
        breedList = { ...breedList, [breed]: false };
      }

      if (!sizeList[size]) {
        sizeList = { ...sizeList, [size]: false };
      }
    });

    setFilterParams({
      ...filterParams,
      activities: activityList,
      breeds: breedList,
      size: sizeList,
    });
  }, [eventsList]);

  const filteredEventList = useMemo(() => {
    if (
      Object.values(filterParams.activities).includes(true) ||
      Object.values(filterParams.breeds).includes(true) ||
      Object.values(filterParams.size).includes(true)
    ) {
      console.log("entra en la primera condción");

      const activeSizes: string[] = Object.keys(filterParams.size).filter(
        (dogSize) => filterParams.size[dogSize] === true
      );
      console.log("activeSizes", activeSizes);

      const activeBreeds: string[] = Object.keys(filterParams.breeds).filter(
        (dogBreed) => filterParams.breeds[dogBreed] === true
      );
      console.log("activeBreeds", activeBreeds);

      const activeActivities: string[] = Object.keys(
        filterParams.activities
      ).filter((activity) => filterParams.activities[activity] === true);
      console.log("activeActivities", activeActivities);

      return eventsList.filter((event, index) => {
        if (activeSizes.length > 0 && !activeSizes.includes(event.size)) {
          console.log(event.size, index);
          return false;
        }

        if (activeBreeds.length > 0 && !activeBreeds.includes(event.breed)) {
          console.log(event.breed, index);
          return false;
        }

        if (
          activeActivities.length > 0 &&
          !activeActivities.includes(event.activity)
        ) {
          console.log(event.activity, index);
          return false;
        }

        return true;
      });
    } else {
      return eventsList;
    }
  }, [filterParams, eventsList]);

  console.log(filteredEventList);
  console.log("filterparams", filterParams);

  const handleSidebarDisplay = (sidebarDisplay: boolean) => {
    setSidebarDisplay(!sidebarDisplay);
  };

  const handleFilterParams = (category: string) => {
    if (category in filterParams.activities) {
      setFilterParams((prevFilterParams) => ({
        ...prevFilterParams,
        activities: {
          ...prevFilterParams.activities,
          [category]: !prevFilterParams.activities[category],
        },
      }));
    }

    if (category in filterParams.breeds) {
      setFilterParams((prevFilterParams) => ({
        ...prevFilterParams,
        breeds: {
          ...prevFilterParams.breeds,
          [category]: !prevFilterParams.breeds[category],
        },
      }));
    }

    if (category in filterParams.size) {
      setFilterParams((prevFilterParams) => ({
        ...prevFilterParams,
        size: {
          ...prevFilterParams.size,
          [category]: !prevFilterParams.size[category],
        },
      }));
    }
  };

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
        <div
          className="filter-button display--flex"
          onClick={() => handleSidebarDisplay(sidebarDisplay)}
        >
          <p>Filters</p>
          <img src="imgs/filter.svg" alt="Filter Icon" />
        </div>
      </div>
      <section className="grid">
        {filteredEventList.map((event: CardData) => {
          return <Card key={event.id} event={event} />;
        })}
      </section>
      {sidebarDisplay && (
        <Sidebar
          filterData={filterParams}
          onClick={handleSidebarDisplay}
          onChange={handleFilterParams}
        />
      )}
    </>
  );
}

export default App;
