import { useState, useEffect } from "react";
import { getCourses, getProfessors } from "../utils/firestore";
import { db } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function FeedbackForm({ initialCourse = "", initialProfessor = "" }) {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [selectedProfessor, setSelectedProfessor] = useState(initialProfessor);
  const [comments, setComments] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const availableTags = ["Easy Grader", "Tough Exams", "Fair Assignments", "Helpful", "Strict", "Engaging"];

  useEffect(() => {
    async function fetchData() {
      const allCourses = await getCourses();
      setCourses(allCourses);
      setDepartments([...new Set(allCourses.map((c) => c.department))]);

      const allProfessors = await getProfessors();
      setProfessors(allProfessors);
    }
    fetchData();
  }, []);

  // Filter courses when department is selected
  const filteredCourses = selectedDepartment
    ? courses.filter((c) => c.department === selectedDepartment)
    : courses;

  // Filter professors when course is selected
  const filteredProfessors = selectedCourse
    ? professors.filter((p) => p.courses?.includes(selectedCourse))
    : professors;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedCourse) {
      alert("Please select a course to submit a review.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        department: selectedDepartment,
        courseId: selectedCourse,
        professorId: selectedProfessor || null,
        comments,
        tags: tags || [], // Ensure it's always an array
        timestamp: Timestamp.now(),
      });

      alert("Review submitted successfully!");
      setComments("");
      setTags([]);
      if (!initialCourse) setSelectedCourse("");
      if (!initialProfessor) setSelectedProfessor("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/40 backdrop-blur-md rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Submit a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Department */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Department</span>
          <select
            className="w-full mt-1 p-3 rounded-md border bg-white focus:ring-2 focus:ring-red-500"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedCourse(""); // Reset course when department changes
              setSelectedProfessor(""); // Reset professor
            }}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </label>

        {/* Select Course */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Course</span>
          <select
            className="w-full mt-1 p-3 rounded-md border bg-white focus:ring-2 focus:ring-red-500"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {filteredCourses.map((course) => (
              <option key={course.code} value={course.code}>
                {course.name} ({course.code})
              </option>
            ))}
          </select>
        </label>

        {/* Select Professor */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Professor (Optional)</span>
          <select
            className="w-full mt-1 p-3 rounded-md border bg-white focus:ring-2 focus:ring-red-500"
            value={selectedProfessor}
            onChange={(e) => setSelectedProfessor(e.target.value)}
          >
            <option value="">Select Professor</option>
            {filteredProfessors.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.name}
              </option>
            ))}
          </select>
        </label>

        {/* Tags */}
        <div>
          <span className="text-gray-700 font-semibold">Tags</span>
          <div className="flex flex-wrap mt-2 gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`px-3 py-2 rounded-lg text-sm ${
                  tags?.includes(tag) ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() =>
                  setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Comments */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Comments</span>
          <textarea
            className="w-full mt-1 p-3 rounded-md border bg-white focus:ring-2 focus:ring-red-500"
            rows="4"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Write your review..."
          ></textarea>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
