import React from 'react';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <a 
            key={index}
            href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel?.hotelAddress || '')} 
            target='_blank' 
            rel='noopener noreferrer'
            className='hover:scale-105 transition-all cursor-pointer'
          >
            <div className='rounded-xl overflow-hidden'>
              <img src={hotel?.hotelImageUrl || '/bg.jpg'} alt='Hotel Image' className='w-full h-auto' />
              <div className='my-2 flex flex-col gap-2'>
                <h2 className='text-lg font-semibold'>{hotel?.hotelName || 'Hotel Name Not Available'}</h2>
                <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress || 'Hotel Address Not Available'}</h2>
                <h2 className='text-sm'>💵 {hotel?.price || 'Hotel Price Not Available'}</h2>
                <h2 className='text-sm'>🌟 {hotel?.rating || 'No Rating Available'}</h2>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
