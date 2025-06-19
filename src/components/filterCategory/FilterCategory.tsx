import { FilterCategoryProps } from "../../types";
import { capitalizeFirstLetter } from "../../functions/Functions";
import { useState } from "react";
import "../../index.css";
import "./FilterCategory.css";
import chevron from "../../imgs/filters/chevron-down.svg";

export const FilterCategory = ({
  title,
  categories,
  onChange,
}: FilterCategoryProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='filter-category'>
      <div
        className='filter-category--header'
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className='filter-category--title'>{capitalizeFirstLetter(title)}</p>
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
      {isOpen &&
        categories &&
        Object.keys(categories).map((category) => {
          return (
            <div className='filter-category--container' key={category}>
              <input
                type='checkbox'
                className='filter-category--checkbox'
                onChange={() => onChange(category)}
                checked={categories[category]}
              />
              <p className='filter-category--text'>
                {capitalizeFirstLetter(category)}
              </p>
            </div>
          );
        })}
    </div>
  );
};
