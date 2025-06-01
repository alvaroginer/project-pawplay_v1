import { EventCard } from "../components/eventCard/EventCard";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/button/Button";
import { Sidebar } from "../components/sidebar/Sidebar";
import { EventData, FilterProps } from "../types";
import { getEvents } from "../dataBase/services/readFunctions";
import { sameDay } from "../functions/Functions";
import filter from "../imgs/filter.svg";

export const EventsMainPage = () => {
  const [eventsList, setEventsList] = useState<EventData[]>([]);
  const [filterParams, setFilterParams] = useState<FilterProps>({
    activities: {},
    breeds: {},
    size: {},
    date: null,
  });
  const [sidebarDisplay, setSidebarDisplay] = useState<boolean>(false);
  const [exitAnimation, setExitAnimation] = useState<boolean>(false);

  useEffect(() => {
    // Llamada a la base de datos
    const fetchEvents = async () => {
      const eventsSnap: EventData[] = await getEvents();

      setEventsList(eventsSnap);
    };

    fetchEvents();
  }, []);

  //Creamos el filterParams
  useEffect(() => {
    let activityList: Record<string, boolean> = {};
    let breedsList: Record<string, boolean> = {};
    let sizeList: Record<string, boolean> = {};
    eventsList.forEach((eventCard) => {
      const { activity, breeds, size } = eventCard;

      if (!breedsList[breeds] && breeds !== "Any") {
        breedsList = { ...breedsList, [breeds]: false };
      }

      if (!activityList[activity]) {
        activityList = { ...activityList, [activity]: false };
      }

      if (!sizeList[size] && size !== "Any") {
        sizeList = { ...sizeList, [size]: false };
      }
    });

    setFilterParams({
      activities: activityList,
      breeds: breedsList,
      size: sizeList,
      date: null,
    });
  }, [eventsList]);

  const filteredEventList = useMemo(() => {
    if (
      Object.values(filterParams.activities).includes(true) ||
      Object.values(filterParams.breeds).includes(true) ||
      Object.values(filterParams.size).includes(true) ||
      filterParams.date
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

        if (activeBreeds.length > 0 && !activeBreeds.includes(event.breeds)) {
          console.log(event.breeds, index);
          return false;
        }

        if (
          activeActivities.length > 0 &&
          !activeActivities.includes(event.activity)
        ) {
          console.log(event.activity, index);
          return false;
        }

        if (filterParams.date) {
          const activeDate: boolean = sameDay(
            event.dateTime.toDate(),
            filterParams.date
          );
          if (!activeDate) return false;
        }

        return true;
      });
    } else {
      return eventsList;
    }
  }, [filterParams, eventsList]);

  const handleSidebarDisplay = (sidebarDisplay: boolean) => {
    if (sidebarDisplay === true) {
      setExitAnimation(true);
      setTimeout(() => {
        setExitAnimation(false);
        setSidebarDisplay(false);
      }, 400);
    } else {
      setSidebarDisplay(true);
    }
  };

  const handleFilterParams = (category: string | Date) => {
    const categoryIsString = typeof category === "string";

    if (categoryIsString && category in filterParams.activities) {
      setFilterParams((prevFilterParams) => ({
        ...prevFilterParams,
        activities: {
          ...prevFilterParams.activities,
          [category]: !prevFilterParams.activities[category],
        },
      }));
    }

    if (categoryIsString && category in filterParams.breeds) {
      setFilterParams((prevFilterParams) => ({
        ...prevFilterParams,
        breeds: {
          ...prevFilterParams.breeds,
          [category]: !prevFilterParams.breeds[category],
        },
      }));
    }

    if (categoryIsString && category in filterParams.size) {
      setFilterParams((prevFilterParams) => ({
        ...prevFilterParams,
        size: {
          ...prevFilterParams.size,
          [category]: !prevFilterParams.size[category],
        },
      }));
    }

    if (category instanceof Date) {
      setFilterParams((prevFilterParams) => ({
        ...prevFilterParams,
        date: category,
      }));
    }
  };

  return (
    <>
      <div className='main-events-container'>
        <main className='item__100'>
          <div className='filter-container'>
            <input
              type='text'
              className='searchbar'
              placeholder='Search the event you want to go'
            />
            <div className='filter-button--container'>
              <div
                className='filter-button'
                onClick={() => handleSidebarDisplay(sidebarDisplay)}
              >
                <p>Filters</p>
                <img src={filter} alt='Filter Icon' />
              </div>
            </div>
          </div>
          <div className='grid'>
            {filteredEventList.map((event: EventData) => {
              return <EventCard key={event.id} event={event} />;
            })}
          </div>
        </main>
        {sidebarDisplay && (
          <Sidebar
            exitAnimation={exitAnimation}
            filterParams={filterParams}
            onClick={handleSidebarDisplay}
            onChange={handleFilterParams}
          />
        )}
      </div>
      <div className='create-event-modal'>
        <Button className='primary'>Create an event</Button>
      </div>
    </>
  );
};
