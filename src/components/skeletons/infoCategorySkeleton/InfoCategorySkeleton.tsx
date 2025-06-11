export const InfoCategorySkeleton = () => {
  return (
    <div className='event--category'>
      <div className='event--category__img info-category--image__skeleton skeleton'></div>
      <div className='event--category__text'>
        <div className='info-category--title__skeleton skeleton'></div>
        <div className='category--text-container'>
          <div className='info-category--text__skeleton skeleton'></div>
        </div>
      </div>
    </div>
  );
};
