import { FilterCategoryProps } from "../../types";
import { capitalizeFirstLetter } from "../../functions/Functions";
import "../../index.css";
import "./FilterCategory.css";

export const FilterCategory = ({
  title,
  categories,
  onChange,
}: FilterCategoryProps) => {
  return (
    <div className="filter-category">
      <p className="filter-category--title">{capitalizeFirstLetter(title)}</p>
      {Object.keys(categories).map((category) => {
        return (
          <div className="filter-category--container" key={category}>
            <input
              type="checkbox"
              className="filter-category--checkbox"
              onChange={() => onChange(category)}
              checked={categories[category]}
            />
            <p className="filter-category--text">
              {capitalizeFirstLetter(category)}
            </p>
          </div>
        );
      })}
    </div>
  );
};
