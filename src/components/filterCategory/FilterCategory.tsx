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
    <div>
      <p className="">{capitalizeFirstLetter(title)}</p>
      {Object.keys(categorys).map((category) => {
        return (
          <div className="filter-category--container" key={category}>
            <input type="checkbox" />
            <p>{category}</p>
          </div>
        );
      })}
    </div>
  );
};
