import { capitalizeFirstLetter } from "../../functions/Functions";
import "../../index.css";
import "./FilterCategory.css";

export const FilterCategory = ({
  title,
  categorys,
}: {
  title: string;
  categorys: Record<string, boolean>;
}) => {
  return (
    <div className="filter-category">
      <p className="filter-category--title">{capitalizeFirstLetter(title)}</p>
      {Object.keys(categorys).map((category) => {
        return (
          <div className="filter-category--container" key={category}>
            <input type="checkbox" className="filter-category--checkbox" />
            <p className="filter-category--text">
              {capitalizeFirstLetter(category)}
            </p>
          </div>
        );
      })}
    </div>
  );
};
