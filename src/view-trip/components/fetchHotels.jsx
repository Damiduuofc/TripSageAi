import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Ensure correct path to your Firebase setup
import { collection, getDocs } from 'firebase/firestore';
import Hotels from './Hotels';

function App() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'trips'));
        const tripData = querySnapshot.docs.map(doc => doc.data())[0]; // Adjust this to get the correct document
        setTrip(tripData);
      } catch (err) {
        setError('Failed to fetch trip data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {trip ? <Hotels trip={trip} /> : <p>No trip data available</p>}
    </div>
  );
}

export default App;
