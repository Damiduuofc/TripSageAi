import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { GetPlaceDetails } from '@/service/GlobalApi';

const Information = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const GetPlacePhoto = async () => {
      if (!trip?.userSelection?.location?.label) {
        console.log('No location label available');
        return;
      }

      // Log request data for debugging
      console.log('API request data:', {
        textQuery: trip.userSelection.location.label,
      });

      try {
        const result = await GetPlaceDetails({
          textQuery: trip.userSelection.location.label,
        });

        // Log full API response for debugging
        console.log('API Response:', result.data);

        const places = result.data?.places;
        if (!places || places.length === 0) {
          console.log('No places found');
          setError('No places found');
          return;
        }

        const photos = places[0]?.photos;
        if (!photos) {
          console.log('No photos found for this place');
          setError('No photos found for this place');
          return;
        }

        if (photos.length > 3) {
          const photo = photos[3];
          const photoReference = photo?.photo_reference;

          if (photoReference) {
            const url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&maxheight=600&maxwidth=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
            console.log('Photo URL:', url);
            setPhotoUrl(url);
            setError('');
          } else {
            setError('Photo reference is undefined');
          }
        } else {
          setError('Not enough photos available');
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
        setError('Error fetching place details. Check the console for more information.');
      }
    };

    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const { userSelection } = trip || {};

  return (
    <div>
      {photoUrl ? (
        <img src={photoUrl} alt='Place' className='h-[340px] w-full object-cover rounded-xl mt-5' />
      ) : (
        <div className='h-[340px] w-full flex items-center justify-center rounded-xl mt-5 bg-gray-200'>
          <span className='text-gray-500'>{error || 'No Image Available'}</span>
        </div>
      )}
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{userSelection?.location?.label || 'Location not available'}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {userSelection?.noOfdays || 'N/A'} Days</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {userSelection?.budget || 'N/A'} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🏄🏻‍♂️ No. of Travelers: {userSelection?.Traveler || 'N/A'}</h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};

export default Information;
