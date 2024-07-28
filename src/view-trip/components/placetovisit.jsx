import React from 'react';
import PlaceCarditem from '../components/PlaceCarditem';

function Placetovisit({ trip }) {
  const sortedItinerary = Object.entries(trip?.tripData?.itinerary || {})
    .sort(([aKey], [bKey]) => {
      const aNumber = parseInt(aKey.replace('day', ''), 10);
      const bNumber = parseInt(bKey.replace('day', ''), 10);
      return aNumber - bNumber;
    });

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Places to Visit</h2>
      
      <div>
        {sortedItinerary.map(([dayKey, details], index) => {
          const dayNumber = dayKey.replace('day', '');
          
          return (
            <div key={index} className='mb-4'>
              <h2 className='font-medium text-lg'>Day {dayNumber}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
              <div className='ml-4 my-3'>
                <PlaceCarditem place={details} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Placetovisit;
