import { useEffect, useState } from "react";
import { getCourses, getProfessorById, getReviewsByCourse } from "../utils/firestore";
import FeedbackForm from "../components/FeedbackForm";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourses();

        const updatedCourses = await Promise.all(
          courseData.map(async (course) => {
            const professors = await Promise.all(
              (course.professorIds || []).map(getProfessorById)
            );

            const reviews = await getReviewsByCourse(course.id);
            return { ...course, professors, reviews };
          })
        );

        setCourses(updatedCourses);
      } catch (error) {
        console.error("Error fetching courses or reviews:", error);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Courses</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search for a course..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-1/2 mx-auto p-2 border rounded-lg mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold">{course.name}</h2>
            <p className="text-gray-600">{course.department}</p>

            <p className="mt-2 text-sm text-gray-500">
              <strong>Professors:</strong> {course.professors.map((p) => p?.name).join(", ")}
            </p>

            {/* 📢 Students Who Took This Course */}
            <h4 className="text-sm font-bold mt-3">Students Who Took This Course:</h4>
            <ul className="text-gray-500 text-sm">
              {Array.isArray(course.reviews) && course.reviews.length > 0 ? (
                course.reviews.map((review, index) => (
                  <li key={index}>{review.studentEmail}</li>  
                ))
              ) : (
                <p className="text-gray-400">No students have reviewed this class yet.</p>
              )}
            </ul>

            {/* 💬 Reviews */}
            <h4 className="font-bold mt-3">Reviews:</h4>
            <ul>
              {Array.isArray(course.reviews) && course.reviews.length > 0 ? (
                course.reviews.map((review, index) => (
                  <li key={index} className="text-gray-700">
                    ⭐ {review.rating} - {review.comment}
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No reviews yet.</p>
              )}
            </ul>

            {/* 📝 Review Form */}
            <FeedbackForm courseId={course.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
