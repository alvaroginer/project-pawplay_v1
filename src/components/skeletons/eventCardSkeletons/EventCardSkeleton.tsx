import "../skeletons.css";

export const EventCardSkeleton = () => {
  return (
    <>
      <div className='event-card event-card--skeleton grid-cell margin--bt__24'>
        <div className='event-card--image position-relative skeleton'></div>
        <div className='event-card--bottom-section'>
          <div className='event-card--text'>
            <div className='event-card--text--big__skeleton skeleton'></div>
            <div className='event-card--text__skeleton skeleton'></div>
          </div>
          <div className='event-card--footer'>
            <div className='event-card--rating__skeleton skeleton'></div>
            <div className='event-card--rating__skeleton skeleton'></div>
          </div>
        </div>
      </div>
    </>
  );
};
