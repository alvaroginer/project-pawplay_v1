import { useContext, useMemo, useState, useEffect } from "react";
import { DateFilterProps, EventData, FilterProps } from "../types";
import { AuthContext } from "./auth/AuthContext";
import {
  getEvents,
  getHomePageEvents,
} from "../dataBase/services/readFunctions";

interface useFilterProps {
  filterParams: FilterProps;
  dateFilterParams: DateFilterProps;
  filteredEventList: EventData[];
  sidebarDisplay: boolean;
  exitAnimation: boolean;
  isLoading: boolean;
  setDateFilterParams: React.Dispatch<React.SetStateAction<DateFilterProps>>;
  handleSidebarDisplay: (sidebarDisplay: boolean) => void;
  handleFilterParams: (category: string | Date) => void;
}

export const useFilter = (): useFilterProps => {
  const [eventsList, setEventsList] = useState<EventData[]>([]);
  const [filterParams, setFilterParams] = useState<FilterProps>({
    activities: {},
    breeds: {},
    size: {},
  });
  const [dateFilterParams, setDateFilterParams] = useState<DateFilterProps>({
    startDate: new Date(),
    endDate: null,
  });
  const [sidebarDisplay, setSidebarDisplay] = useState<boolean>(false);
  const [exitAnimation, setExitAnimation] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { loggedProfile } = useContext(AuthContext);

  // Llamada a la base de datos
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (loggedProfile) {
          const specificEventsSnap: EventData[] = await getHomePageEvents(
            loggedProfile.id,
            loggedProfile.likedEvents
          );
          setEventsList(specificEventsSnap);
        } else {
          const allEventsSnap: EventData[] = await getEvents();
          setEventsList(allEventsSnap);
        }
        setIsLoading(false);
      } catch {
        console.error("Error while uploading events form DB");
      }
    };
    fetchEvents();
  }, [loggedProfile]);

  //Creamos el filterParams
  // Revisar para que sea una fucnión y llamarla en el primer useEffect
  useEffect(() => {
    const createFilterParams = () => {
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
      });
    };
    createFilterParams();
  }, [eventsList]);

  //Transformar condición de filtro en una variable
  const filteredEventList = useMemo(() => {
    if (
      Object.values(filterParams.activities).includes(true) ||
      Object.values(filterParams.breeds).includes(true) ||
      Object.values(filterParams.size).includes(true) ||
      dateFilterParams.endDate
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
        //Filtramos las fechas
        const eventDate: number = event.dateTime.toDate().getTime();
        const startDate: number = new Date(dateFilterParams.startDate).setHours(
          0,
          0,
          0,
          0
        );

        if (eventDate < startDate) {
          console.log("desparece por el startDate");
          return false;
        }

        if (dateFilterParams.endDate) {
          const endDateTimestamp = new Date(dateFilterParams.endDate).setHours(
            23,
            59,
            59,
            999
          );

          if (eventDate > endDateTimestamp) {
            console.log("desaparece por el endDate");
            return false;
          }
        }

        //Filtramso otras categorías
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

        return true;
      });
    } else {
      return eventsList;
    }
  }, [filterParams, eventsList, dateFilterParams]);

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

  // hacer mejor un return para cuando category no sea string
  // incluir retunrs
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
  };

  return {
    filterParams,
    dateFilterParams,
    filteredEventList,
    sidebarDisplay,
    exitAnimation,
    isLoading,
    setDateFilterParams,
    handleSidebarDisplay,
    handleFilterParams,
  };
};
