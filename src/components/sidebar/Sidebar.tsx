import { FilterProps } from "../../App";
import { FilterCategory } from "../filterCategory/FilterCategory";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { Button } from "../button/Button";
import "../../index.css";
import "./Sidebar.css";
import { useEffect } from "react";

interface SidebarProps {
  filterData: FilterProps;
  onClick: (sidebarDisplay: boolean) => void;
  onChange: (category: string) => void;
}

export const Sidebar = ({ filterData, onClick, onChange }: SidebarProps) => {
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
            categories={filterData[category]}
            title={capitalizeFirstLetter(category)}
            onChange={onChange}
          />
        );
      })}
      <div className="filter-sidebar--button-container">
        <Button className="btn btn--secondary__outlined" text="Cancel" />
        <Button className="btn btn--secondary margin--left__20" text="Apply" />
      </div>
    </aside>
  );
};
