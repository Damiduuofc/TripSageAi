import axios from 'axios';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { GetPlaceDetails } from '@/service/GlobalApi';

const Information = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  useEffect(() => {
    const GetPlacePhoto = async () => {
      const locationLabel = trip?.userSelection?.location?.label;

      if (!locationLabel) {
        console.log('No location label available');
        return;
      }

      console.log('API request data:', { textQuery: locationLabel });

      try {
        const result = await GetPlaceDetails({
          textQuery: locationLabel,
        });

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

        const photo = photos.length > 3 ? photos[3] : photos[0];
        const photoReference = photo?.photo_reference;

        if (photoReference) {
          const url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&maxheight=600&maxwidth=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
          console.log('Photo URL:', url);
          setPhotoUrl(url);
          setError('');
        } else {
          console.log('Photo reference is undefined');
          setError('Photo reference is undefined');
        }
      } catch (error) {
        if (error.response) {
          console.error('Error fetching place details:', error.response);
          if (error.response.status === 403) {
            setError('Access to the API is forbidden. Please check your API key and permissions.');
          } else if (error.response.status === 429) {
            setError('Too many requests. Please try again later.');
          } else {
            setError('Error fetching place details. Check the console for more information.');
          }
        } else {
          console.error('Error fetching place details:', error);
          setError('Network error or server not responding.');
        }
      }
    };

    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setShowCopyMessage(true);
        setTimeout(() => {
          setShowCopyMessage(false);
        }, 3000);
      })
      .catch(err => {
        console.error('Error copying link: ', err);
      });
  };

  return (
    <div>
      {photoUrl ? (
        <img src={photoUrl} alt="Place" className="h-[340px] w-full object-cover rounded-xl mt-5" />
      ) : (
        <img src="/unavailable-image.jpg" alt="Unavailable" className="h-[340px] w-full object-cover rounded-xl mt-5" />
      )}
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label || 'Location not available'}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">📅 {trip?.userSelection?.noOfdays || 'N/A'} Days</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">💰 {trip?.userSelection?.budget || 'N/A'} Budget</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">🏄🏻‍♂️ No. of Travelers: {trip?.userSelection?.Traveler || 'N/A'}</h2>
          </div>
        </div>
        <Button onClick={handleShare}>
          <IoIosSend />
        </Button>
      </div>

      {showCopyMessage && (
        <aside
          className="fixed bottom-4 end-4 z-50 flex items-center justify-center gap-4 rounded-lg bg-black px-5 py-3 text-white"
        >
          <a href="#" target="_blank" rel="noreferrer" className="text-sm font-medium hover:opacity-75">
            Link copied to clipboard 📋
          </a>

          <button className="rounded bg-white/20 p-1 hover:bg-white/10" onClick={() => setShowCopyMessage(false)}>
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </aside>
      )}
    </div>
  );
};

export default Information;
