

import { useState, useEffect } from "react"
import { FilterCategory } from "../filterCategory/FilterCategory"
import { capitalizeFirstLetter } from "../../functions/Functions"
import DatePicker from "react-datepicker"
import { registerLocale } from "react-datepicker"
import { es } from "date-fns/locale/es"
import "react-datepicker/dist/react-datepicker.css"
import "./Sidebar.css"
import closeIcon from "../../imgs/filters/close-thick.svg"
import calendarIcon from "../../imgs/filters/calendar.svg"
import type { SidebarProps } from "../../types"

// Register Spanish local'
registerLocale("es", es)

export const Sidebar = ({ filterParams, onClick, onChange, exitAnimation }: SidebarProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  // Initialize expanded state for all categories
  useEffect(() => {
    const initialExpandedState: Record<string, boolean> = {}
    Object.keys(filterParams).forEach((category) => {
      initialExpandedState[category] = true
    })
    setExpandedCategories(initialExpandedState)
  }, [filterParams])

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  // Handle date selection
  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setStartDate(date)
    }
  }

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen)
  }

  // Handle set day button
  const handleSetDay = () => {
    if (startDate) {
      // Format the date as DD/M/YYYY
      const day = startDate.getDate()
      const month = startDate.getMonth() + 1
      const year = startDate.getFullYear()
      setSelectedDate(`${day}/${month}/${year}`)
      setIsCalendarOpen(false)
    }
  }

  // Handle cancel button
  const handleCancel = () => {
    setIsCalendarOpen(false)
  }

  // Map internal category names to display names
  const getCategoryDisplayName = (category: string): string => {
    const displayNames: Record<string, string> = {
      activity: "Type of activity",
      size: "Dog size",
      breed: "Breed",
    }
    return displayNames[category] || capitalizeFirstLetter(category)
  }

  return (
    <aside className={!exitAnimation ? "filter-modal" : "filter-modal filter-modal__exit"}>
      <button className="filter-modal--close-button" onClick={() => onClick(true)}>
        <img src={closeIcon || "/placeholder.svg"} alt="Close" />
      </button>

      {/* Filter Categories */}
      {Object.keys(filterParams).map((category: string) => {
        return (
          <FilterCategory
            key={category}
            categories={filterParams[category]}
            title={getCategoryDisplayName(category)}
            onChange={onChange}
            isExpanded={expandedCategories[category] || false}
            onToggle={() => toggleCategory(category)}
            categoryType={category}
          />
        )
      })}

      {/* Date Filter Section */}
      <div className="filter-category">
        <div className="filter-category--header" onClick={toggleCalendar}>
          <h3 className="filter-category--title">Date</h3>
          <svg
            className={`filter-category--arrow ${isCalendarOpen ? "expanded" : ""}`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6L8 10L12 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {isCalendarOpen && (
          <>
            {selectedDate && (
              <div className="filter-category--selected-date">
                <p className="filter-category--selected-date-text">Selected date: {selectedDate}</p>
              </div>
            )}

            <div className="date-picker-container">
              <img src={calendarIcon || "/placeholder.svg"} alt="Calendar" className="date-picker-icon" />
            </div>

            <div className="date-picker-modal">
              <div className="date-picker-container">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateSelect}
                  inline
                  locale="es"
                  showMonthDropdown={false}
                  showYearDropdown={false}
                  dateFormat="MMMM yyyy"
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div className="date-picker-header">
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className="date-picker-nav-button"
                      >
                        {"<"}
                      </button>
                      <div className="date-picker-month-year">
                        {date.toLocaleString("es", { month: "long" })} {date.getFullYear()}
                      </div>
                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className="date-picker-nav-button"
                      >
                        {">"}
                      </button>
                    </div>
                  )}
                />
                <div className="date-picker-buttons">
                  <button className="date-picker-cancel-button" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="date-picker-set-button" onClick={handleSetDay}>
                    Set day
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}

