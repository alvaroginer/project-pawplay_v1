import { EventCard } from "../components/eventCard/EventCard";
import { useFilter } from "../hooks/useFilter";
import { Button } from "../components/button/Button";
import { Sidebar } from "../components/sidebar/Sidebar";
import { EventData } from "../types";
import filter from "../imgs/filter.svg";

export const EventsMainPage = () => {
  const {
    filterParams,
    dateFilterParams,
    filteredEventList,
    sidebarDisplay,
    exitAnimation,
    setDateFilterParams,
    handleSidebarDisplay,
    handleFilterParams,
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
            setDate={setDateFilterParams}
            dateFilterParams={dateFilterParams}
          />
        )}
      </div>
      <div className='create-event-modal'>
        <Button className='primary'>Create an event</Button>
      </div>
    </>
  );
};
