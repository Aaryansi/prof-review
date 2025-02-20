"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// import { auth } from "../config/firebase"; // Import Firebase auth
import { auth } from "../config/firebaseConfig"; // ✅ Correct import

import { onAuthStateChanged, signInWithCustomToken, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);

  // Load Rosefire SDK dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/rosefire.min.js"; // ✅ Ensure this file is inside 'public/' folder
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser || null);
    });

    return () => unsubscribe();
  }, []);

  // Function to handle Rosefire login
  const handleLogin = () => {
    if (!window.Rosefire) {
      console.error("Rosefire SDK not loaded!");
      return;
    }

    window.Rosefire.signIn("62c320b3-a749-4d11-9994-4ce75959e8c5", async (err, rfUser) => {
      if (err) {
        console.error("Rosefire error!", err);
        return;
      }

      console.log("Rosefire success!", rfUser);

      // Authenticate with Firebase
      try {
        await signInWithCustomToken(auth, rfUser.token);
        console.log("Firebase login successful!");
      } catch (error) {
        console.error("Firebase Auth Error:", error.message);
      }
    });
  };

  // Function to handle logout
  const handleLogout = async () => {
    await signOut(auth);
    console.log("User logged out");
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-8 py-4 bg-white bg-opacity-60 backdrop-blur-lg shadow-md flex justify-between items-center z-50">
      <h1 className="text-gray-900 text-2xl font-bold tracking-wide">RHIT Courses and Profs</h1>
      
      <div className="space-x-6 text-gray-800 font-medium flex items-center">
        <Link href="/" className="hover:text-red-500 transition">Home</Link>
        <Link href="/courses" className="hover:text-red-500 transition">Courses</Link>
        <Link href="/profs" className="hover:text-red-500 transition">Professors</Link>
        <Link href="/allreviews" className="hover:text-red-500 transition">Reviews</Link>

        <Link href="/review">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition">
            Submit Review
          </button>
        </Link>

        {/* Show login button if no user is logged in */}
        {!user ? (
          <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Login
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-gray-900 font-medium">{user.displayName || "User"}</span>
            <button onClick={handleLogout} className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
