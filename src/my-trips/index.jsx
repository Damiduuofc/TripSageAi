import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    if (!user) {
      navigate('/');
      return;
    }

    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);
    const userTrips = [];
    querySnapshot.forEach((doc) => {
      userTrips.push({ id: doc.id, ...doc.data() });
    });
    setTrips(userTrips);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'> {user?.name}'s Trips</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
        {trips.length > 0 ? (
          trips.map((trip, index) => (
            <UserTripCardItem key={trip.id} trip={trip}  />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
