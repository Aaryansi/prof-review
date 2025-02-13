import { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function FeedbackForm({ courseId, professorId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState(""); // 🔹 Track Student's Email

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        courseId: courseId,
        professorId: professorId || null,
        rating: rating,
        comment: comment,
        studentEmail: email, // 🔹 Store Reviewer's Email
        timestamp: Timestamp.now(),
      });

      alert("Review submitted!");
      setComment(""); // Clear form
      setEmail(""); // Clear email field
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>Submit a Review</h3>
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} Stars
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
}
