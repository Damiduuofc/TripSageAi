import { useState, useEffect } from 'react';
import { db } from '../firebase'; // Ensure correct path to your Firebase setup
import { collection, getDocs } from 'firebase/firestore';
import Hotels from './Hotels';

function App() {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'trips'));
      const tripData = querySnapshot.docs.map(doc => doc.data())[0]; // Adjust this to get the correct document
      setTrip(tripData);
    };
    fetchData();
  }, []);

  return (
    <div>
      {trip ? <Hotels trip={trip} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
