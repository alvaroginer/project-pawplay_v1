import { FilterProps } from "../../App";
import { FilterCategory } from "../filterCategory/FilterCategory";
import { capitalizeFirstLetter } from "../../functions/Functions";
import "../../index.css";
import "./Sidebar.css";

export const Sidebar = ({ filterData }: { filterData: FilterProps }) => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar--header">
        <p className="margin--0">Filters</p>
        <button className="close-button">
          <img src="imgs/close-thick.svg" alt="Close Icon" />
        </button>
      </div>
      {Object.keys(filterData).map((category: string) => {
        return (
          <FilterCategory
            categorys={filterData[category]}
            title={capitalizeFirstLetter(category)}
          />
        );
      })}
    </aside>
  );
};
