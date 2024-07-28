import React from 'react';
import { Link } from 'react-router-dom';

function PlaceCarditem({ place }) {
  const handleImageError = (e) => {
    e.target.src = '/unavailable-image.jpg';
  };

  return (
    <Link 
      to={'https://www.google.com/maps/search/?api=1&query=' + 
          encodeURIComponent((place?.name || '') + ' ' + (place?.geoCoordinates || ''))}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='border rounded-xl p-3 mt-4 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img 
          src={place?.imageUrl || '/unavailable-image.jpg'} 
          alt='Place Image'
          className='w-[130px] h-[130px] rounded-xl' 
          onError={handleImageError}
        />
        <div>
          <h2 className='font-bold text-lg'>{place?.name || 'Name Not Available'}</h2>
          <p className='text-sm text-gray-400'>{place?.details || 'No Details Available'}</p>
          <h2>💵 {place?.ticketPrice || 'No Ticket Price Available'}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCarditem;
