import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [imageUrl, setImageUrl] = useState('unavailable-image.jpg'); // Default image

  useEffect(() => {
    // Replace this with your logic to fetch image based on location
    const locationName = trip?.userSelection?.location?.label;
    if (locationName) {
      // Example: Fetch image from an API
      fetch(`/api/images/${locationName}`)
        .then(response => response.json())
        .then(data => setImageUrl(data.imageUrl))
        .catch(error => console.error('Error fetching image:', error));
    }
  }, [trip]);

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className='p-4 border rounded-lg  mt-5 hover:scale-105 transition-all hover:shadow-md'>
        <img src={imageUrl} className='object-cover rounded-xl mt-3 w-full h-48' alt={trip?.userSelection?.location?.label} />
        <div className='mt-4'>
          <h2 className='text-xl font-bold'>📍{trip?.userSelection?.location?.label}</h2>
          <p className='mt-2 text-gray-700'>📅 Number of Days: {trip?.userSelection?.noOfdays}</p>
          <p className='mt-2 text-gray-700'>💰 Budget: {trip?.userSelection?.budget}</p>
          <p className='mt-2 text-gray-700'>🏄🏻‍♂️ Travelers: {trip?.userSelection?.Traveler}</p>
        </div>
      </div>
      
    </Link>
  );
}

export default UserTripCardItem;