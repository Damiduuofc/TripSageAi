import React from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='p-4 border rounded-lg  mt-5 hover:scale-105 transition-all hover:shadow-md'>
      <img src= '/bg.jpg' className='object-cover rounded-xl mt-3 w-full h-48'/>
      <div className='mt-4'>
        <h2 className='text-xl font-bold'>{trip?.userSelection?.location?.label}</h2>
        <p className='mt-2 text-gray-700'>Number of Days: {trip?.userSelection?.noOfdays}</p>
        <p className='mt-2 text-gray-700'>Budget: {trip?.userSelection?.budget}</p>
        <p className='mt-2 text-gray-700'>Travelers: {trip?.userSelection?.Traveler}</p>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCardItem;
