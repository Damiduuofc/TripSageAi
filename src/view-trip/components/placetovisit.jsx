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
        {sortedItinerary.map(([dayKey, places], index) => {
          const dayNumber = dayKey.replace('day', '');
          
          return (
            <div key={index} className='mb-4'>
              <h2 className='font-medium text-lg'>Day {dayNumber}</h2>
              <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-5'>
                {places.map((place, placeIndex) => (
                  <div key={placeIndex} className='ml-4 my-3'>
                              <h2 className='mt-2'>🕒 {place?.timeSlot || 'No Time Information Available'}</h2>

                    <PlaceCarditem place={place} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Placetovisit;
