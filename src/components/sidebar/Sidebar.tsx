import { FilterCategory } from "../filterCategory/FilterCategory";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { SidebarProps } from "../../types";
import "../../index.css";
import "./Sidebar.css";
import close from "../../imgs/close-thick.svg";

export const Sidebar = ({
  filterParams,
  onClick,
  onChange,
  exitAnimation,
}: SidebarProps) => {
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
        return (
          <FilterCategory
            key={category}
            categories={filterParams[category]}
            title={capitalizeFirstLetter(category)}
            onChange={onChange}
          />
        );
      })}
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
