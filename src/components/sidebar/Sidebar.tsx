import { FilterProps } from "../../App";
import { FilterCategory } from "../filterCategory/FilterCategory";
import "../../index.css";
import "./Sidebar.css";

export const Sidebar = ({ filterData }: { filterData: FilterProps }) => {
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
            categorys={Object.keys(filterData[category])}
            title={capitalizeFirstLetter(category)}
          />
        );
      })}
    </aside>
  );
};
