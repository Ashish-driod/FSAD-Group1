import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // If using Firebase Auth
import { getFirestore } from 'firebase/firestore'; // If using Firestore
import { getAnalytics } from 'firebase/analytics'; // If using Analytics

const firebaseConfig = {
    apiKey: "AIzaSyC4y1MarwL92G6h6ECw9StCjP6tIxxeygA",
    authDomain: "fitness-tracker-a4c23.firebaseapp.com",
    projectId: "fitness-tracker-a4c23",
    storageBucket: "fitness-tracker-a4c23.appspot.com",
    messagingSenderId: "417536557692",
    appId: "1:417536557692:web:d416c176450afc3fc33ff9",
    measurementId: "G-ZR63NCP1V4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
