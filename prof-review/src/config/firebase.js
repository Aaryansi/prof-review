// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics"; // Import analytics

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbgkfiwFqTN1tN7Yn_V1MvPup_ft0ffpQ",
  authDomain: "rosermp-1ac4d.firebaseapp.com",
  projectId: "rosermp-1ac4d",
  storageBucket: "rosermp-1ac4d.firebasestorage.app",
  messagingSenderId: "159006582074",
  appId: "1:159006582074:web:b0bc8bcb6332da96d95c03",
  measurementId: "G-X5J7GBBSHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase
const db = getFirestore(app);

let analytics = null;
if (typeof window !== "undefined") { // Ensure it's running on the client
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, analytics };