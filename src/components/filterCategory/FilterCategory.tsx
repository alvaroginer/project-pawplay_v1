

import { useState } from "react"
import "./FilterCategory.css"
import type { FilterCategoryProps } from "../../types"

interface ExtendedFilterCategoryProps extends FilterCategoryProps {
  categoryType?: string
}

export const FilterCategory = ({
  title,
  categories,
  onChange,
  isExpanded = true,
  onToggle,
  categoryType = "",
}: ExtendedFilterCategoryProps) => {
  const [showAll, setShowAll] = useState(false)
  const categoryEntries = Object.entries(categories)

  // Determine if this category should have More/Less functionality
  const isBreedCategory = categoryType === "breed" || title.toLowerCase() === "breed"

  // Set visible limit for breeds
  const visibleLimit = 6
  const hasMoreItems = isBreedCategory && categoryEntries.length > visibleLimit

  // Filter items to show based on showAll state
  const visibleItems = hasMoreItems && !showAll ? categoryEntries.slice(0, visibleLimit) : categoryEntries

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <div className="filter-category">
      <div className="filter-category--header" onClick={onToggle}>
        <h3 className="filter-category--title">{title}</h3>
        <svg
          className={`filter-category--arrow ${isExpanded ? "expanded" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 6L8 10L12 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {isExpanded && (
        <div className="filter-category--options">
          {visibleItems.map(([category, isChecked]) => (
            <div className="filter-option" key={category}>
              <input
                type="checkbox"
                id={category}
                checked={isChecked}
                onChange={() => onChange(category)}
                className="filter-option--checkbox"
              />
              <label htmlFor={category} className="filter-option--label">
                {category}
              </label>
            </div>
          ))}

          {hasMoreItems && (
            <div className="filter-category--more-less">
              {showAll ? (
                <span className="filter-category--less-button" onClick={toggleShowAll}>
                  — Less
                </span>
              ) : (
                <span className="filter-category--more-button" onClick={toggleShowAll}>
                  + More
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


