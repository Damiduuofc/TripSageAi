import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Information from '../components/infomation';
import Hotels from '../components/Hotels';
import Placetovisit from '../components/placetovisit';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
        toast.error('No trip found!');
      }
    } catch (error) {
      console.error("Error getting document:", error);
      toast.error('Failed to retrieve trip data.');
    }
  };

  return (
    <div>
      <Information trip={trip} />
      <Hotels trip={trip} />
      <Placetovisit trip={trip} />
    </div>
  );
}

export default ViewTrip;
