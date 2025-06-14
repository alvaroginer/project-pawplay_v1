import { EventCard } from "../components/eventCard/EventCard";
import { useFilter } from "../hooks/useFilter";
import { CreateEventButton } from "../components/button/CreateEventButton";
import { Sidebar } from "../components/sidebar/Sidebar";
import { EventData } from "../types";
import { EventCardSkeleton } from "../components/skeletons/eventCardSkeletons/EventCardSkeleton";
import filter from "../imgs/filter.svg";

export const EventsMainPage = () => {
  const {
    filterParams,
    dateFilterParams,
    filteredEventList,
    sidebarDisplay,
    exitAnimation,
    isLoading,
    setDateFilterParams,
    handleSidebarDisplay,
    handleFilterParams,
    setSearchbarContent,
  } = useFilter();

  return (
    <>
      <div className='main-events-container'>
        <main className='item__100'>
          <div className='filter-container'>
            <input
              type='text'
              className='searchbar'
              placeholder='Search the event you want to go'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                if (value.trim().toLocaleLowerCase()) {
                  setSearchbarContent(value.trim());
                } else {
                  setSearchbarContent("");
                }
              }}
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
            {isLoading
              ? Array.from({ length: 15 }).map((_, i) => (
                  <EventCardSkeleton key={i} />
                ))
              : filteredEventList.map((event: EventData) => {
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
            setDate={setDateFilterParams}
            dateFilterParams={dateFilterParams}
          />
        )}
      </div>
      <div className='create-event-modal'>
        <CreateEventButton />
      </div>
    </>
  );
};
