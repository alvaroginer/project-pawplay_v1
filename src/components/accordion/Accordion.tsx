import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ViewMoreCard } from "../viewMoreCard/ViewMoreCard";
import { AccordionProps, EventData } from "../../types";
import { EventCard } from "../eventCard/EventCard";
import "./Accordion.css";
import plus from "../../imgs/plus.svg";

export const Accordion = ({
  text,
  defaultOpen = false,
  eventsData,
  url,
}: AccordionProps) => {
  const [showAccordion, setShowAccordion] = useState<boolean>(defaultOpen);

  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const mousePressed = useRef(false);
  const firstClickPosition = useRef(0);
  const firstScrollPosition = useRef(0);

  useEffect(() => {
    const slider = cardsContainerRef.current;
    if (!slider) return;

    // Maneja el evento cuando se presiona el ratón sobre el contenedor
    const handleMousePressed = (e: MouseEvent) => {
      mousePressed.current = true;
      firstClickPosition.current = e.pageX - slider.offsetLeft;
      firstScrollPosition.current = slider.scrollLeft;
    };

    const handleMouseReleased = () => {
      mousePressed.current = false;
    };

    // Maneja el evento cuando se mueve el ratón
    const handleMouseMove = (e: MouseEvent) => {
      if (!mousePressed.current) return;
      e.preventDefault();
      const x = e.clientX - slider.offsetLeft;
      const walk = (x - firstClickPosition.current) * 0.5; // velocidad del scroll
      slider.scrollLeft = firstScrollPosition.current - walk;
    };

    slider.addEventListener("mousedown", handleMousePressed);
    slider.addEventListener("mouseup", handleMouseReleased);
    slider.addEventListener("mouseleave", handleMouseReleased);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMousePressed);
      slider.removeEventListener("mouseup", handleMouseReleased);
      slider.removeEventListener("mouseleave", handleMouseReleased);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showAccordion]);

  const handleClick = () => {
    setShowAccordion(!showAccordion);
  };

  return (
    <>
      <div
        className={`accordion ${
          showAccordion === true ? "accordion--open" : ""
        }`}
      >
        <div className="accordion__info" onClick={handleClick}>
          <p className="accordion__title">{text}</p>
          <img
            src={plus}
            alt="Icon to expand section"
            className="accordion__icon"
          />
        </div>
        {showAccordion === true && (
          <>
            <div className="accordion__cards" ref={cardsContainerRef}>
              {eventsData && eventsData.length > 0 ? (
                eventsData.map((eventData: EventData) => {
                  return <EventCard key={eventData.id} event={eventData} />;
                })
              ) : (
                <p>Sorry... There are no related events</p>
              )}
              {eventsData && eventsData.length > 3 && (
                <Link
                  to={`/my-events/${url}`}
                  className="accordion__view-all-link"
                >
                  <ViewMoreCard />
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
