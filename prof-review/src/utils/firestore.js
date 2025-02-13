import { db } from "../config/firebase";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";

// Fetch all courses
export const getCourses = async () => {
  const querySnapshot = await getDocs(collection(db, "courses"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fetch professor details by ID
export const getProfessorById = async (professorId) => {
  const docRef = doc(db, "profs", professorId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Fetch all professors
export const getProfessors = async () => {
    const querySnapshot = await getDocs(collection(db, "profs"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
  

export const getReviewsByCourse = async (courseId) => {
    try {
      console.log(`Fetching reviews for Course ID: ${courseId}`); // Debugging Log
  
      // Ensure courseId is a string (match Firestore format)
      const q = query(collection(db, "reviews"), where("courseId", "array-contains", String(courseId)));
      
      const querySnapshot = await getDocs(q);
  
      const reviews = querySnapshot.docs.map((doc) => doc.data());
      console.log(`Fetched Reviews for ${courseId}:`, reviews); // Debugging Log
  
      return reviews.length > 0 ? reviews : [];  // Ensure reviews is always an array
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  };