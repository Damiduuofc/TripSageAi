import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [imageUrl, setImageUrl] = useState('unavailable-image.jpg'); // Default image
  const locationName = trip?.userSelection?.location?.label; // Extracted outside useEffect

  useEffect(() => {
    if (locationName) {
      fetch(`/api/images/${locationName}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch image');
          }
          return response.json();
        })
        .then(data => setImageUrl(data.imageUrl || 'unavailable-image.jpg'))
        .catch(error => {
          console.error('Error fetching image:', error);
          setImageUrl('unavailable-image.jpg'); // Fallback to default image
        });
    }
  }, [locationName]); // Depend only on locationName

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className='p-4 border rounded-lg mt-5 hover:scale-105 transition-all hover:shadow-md'>
        <img 
          src={imageUrl} 
          className='object-cover rounded-xl mt-3 w-full h-48' 
          alt={trip?.userSelection?.location?.label || 'Location image'} 
        />
        <div className='mt-4'>
          <h2 className='text-xl font-bold'>📍{trip?.userSelection?.location?.label}</h2>
          <p className='mt-2 text-gray-700'>📅 Number of Days: {trip?.userSelection?.noOfdays}</p>
          <p className='mt-2 text-gray-700'>💰 Budget: {trip?.userSelection?.budget}</p>
          <p className='mt-2 text-gray-700'>🏄🏻‍♂️ Travelers: {trip?.userSelection?.travelers}</p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
