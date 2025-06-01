import { FilterCategory } from "../filterCategory/FilterCategory";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { SidebarProps } from "../../types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "../../index.css";
import "./Sidebar.css";
import close from "../../imgs/close-thick.svg";
import chevron from "../../imgs/filters/chevron-down.svg";

export const Sidebar = ({
  filterParams,
  onClick,
  onChange,
  exitAnimation,
  setDate,
  dateFilterParams,
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <aside
      className={
        !exitAnimation
          ? "filter-sidebar"
          : "filter-sidebar filter-sidebar__exit"
      }
    >
      <div className='filter-sidebar--header'>
        <p className='filter-sidebar--header__text'>Filters</p>
        <button
          className='filter-sidebar--header__close-button'
          onClick={() => onClick(true)}
        >
          <img src={close} alt='Close Icon' />
        </button>
      </div>
      {Object.keys(filterParams).map((category: string) => {
        if (category === "date") return;

        return (
          <FilterCategory
            key={category}
            categories={filterParams[category]}
            title={capitalizeFirstLetter(category)}
            onChange={onChange}
          />
        );
      })}
      <div className='filter-category'>
        <div className='filter-category--header'>
          <p className='filter-category--title'>Date</p>
          <button
            className={`filter-category--display-button ${isOpen && ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              className={`filter-category--display-button__image ${
                isOpen && "display--button__image--rotation"
              }`}
              src={chevron}
              alt='Arrow icon'
            />
          </button>
        </div>
        {isOpen && (
          <DatePicker
            selected={dateFilterParams.startDate}
            onChange={([start, end]) => {
              if (start) {
                setDate({ startDate: start, endDate: end });
              }
            }}
            startDate={dateFilterParams.startDate}
            endDate={dateFilterParams.endDate}
            selectsRange
            inline
          />
        )}
      </div>
      <div className='filter-sidebar--button-container'>
        <button
          className='btn btn--secondary margin--left__20'
          onClick={() => onClick(true)}
        >
          Apply
        </button>
      </div>
    </aside>
  );
};
