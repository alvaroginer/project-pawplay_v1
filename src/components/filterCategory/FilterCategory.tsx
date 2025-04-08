import { capitalizeFirstLetter } from "../../functions/Functions";
import "../../index.css";
import "./FilterCategory.css";

export const FilterCategory = ({
  title,
  categories,
  onChange,
}: {
  title: string;
  categories: Record<string, boolean>;
  onChange: (string: string) => void;
}) => {
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
