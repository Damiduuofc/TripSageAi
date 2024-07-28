import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBatvyzJ6xM1VzQGnqQf9EsHMR8KAgXXmw",
  authDomain: "tripsagsai.firebaseapp.com",
  projectId: "tripsagsai",
  storageBucket: "tripsagsai.appspot.com",
  messagingSenderId: "710982548522",
  appId: "1:710982548522:web:e80c90228216c4d0429753",
  measurementId: "G-BJ7X7X1L44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
