import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbgkfiwFqTN1tN7Yn_V1MvPup_ft0ffpQ",
  authDomain: "rosermp-1ac4d.firebaseapp.com",
  projectId: "rosermp-1ac4d",
  storageBucket: "rosermp-1ac4d.firebasestorage.app",
  messagingSenderId: "159006582074",
  appId: "1:159006582074:web:b0bc8bcb6332da96d95c03",
  measurementId: "G-X5J7GBBSHR",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export { auth, app }; // ✅ Properly export auth
