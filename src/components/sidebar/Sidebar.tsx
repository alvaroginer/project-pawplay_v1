import { FilterProps } from "../../App";
import { FilterCategory } from "../filterCategory/FilterCategory";
import { capitalizeFirstLetter } from "../../functions/Functions";
import "../../index.css";
import "./Sidebar.css";

export const Sidebar = ({
  filterData,
  onClick,
}: {
  filterData: FilterProps;
  onClick: (boolean: boolean) => void;
}) => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar--header">
        <p className="margin--0">Filters</p>
        <button className="close-button" onClick={() => onClick(true)}>
          <img src="imgs/close-thick.svg" alt="Close Icon" />
        </button>
      </div>
      {Object.keys(filterData).map((category: string) => {
        return (
          <FilterCategory
            key={category}
            categorys={filterData[category]}
            title={capitalizeFirstLetter(category)}
          />
        );
      })}
    </aside>
  );
};
