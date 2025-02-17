import { useEffect, useState } from "react";
import { getCourses, getReviewsByCourse, deleteReview } from "../utils/firestore";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourses();
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      getReviewsByCourse(selectedCourse.code).then(setReviews);
    }
  }, [selectedCourse]);

  const departments = [...new Set(courses.map((course) => course.department))];

  const filteredCourses = courses.filter(
    (course) =>
      (!selectedDepartment || course.department === selectedDepartment) &&
      (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const matchingCourse = courses.find(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingCourse) {
        setSelectedDepartment(matchingCourse.department);
      }
    }
  }, [searchTerm, courses]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center px-6 py-12">
      <div className="absolute inset-0 bg-moving-gradient opacity-20"></div>

      <h1 className="text-5xl font-extrabold text-gray-900 text-center drop-shadow-lg">
        Browse Courses
      </h1>
      <p className="text-lg text-gray-600 mt-2 text-center">
        Explore courses by department or search for a specific course.
      </p>

      <div className="relative w-full md:w-1/2 mt-6">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-12 border rounded-xl shadow-lg bg-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
        />
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {departments.map((department) => (
          <button
            key={department}
            onClick={() =>
              setSelectedDepartment(selectedDepartment === department ? null : department)
            }
            className={`glass-card px-6 py-4 text-center font-semibold transition transform hover:scale-105 ${
              selectedDepartment === department
                ? "bg-red-600 text-white shadow-xl"
                : "bg-white/40 text-gray-900 hover:bg-white/50"
            }`}
          >
            {department}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="glass-card p-6 rounded-lg shadow-xl hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-900">{course.name}</h2>
              <p className="text-gray-500">{course.department}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-6">No courses found.</p>
        )}
      </div>

      {selectedCourse && (
        <div className="mt-12 p-6 bg-white/50 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold">{selectedCourse.name}</h2>
          <p className="text-gray-700">{selectedCourse.department}</p>

          <Link href={`/review?course=${selectedCourse.code}`}>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Submit a Review
            </button>
          </Link>

          <h3 className="text-2xl font-semibold mt-6">Student Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded-lg shadow-md mt-4">
                <p className="text-gray-900">{review.comments}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {review.tags?.join(", ") || "No tags"}
                </p>
                <button
                  onClick={() => deleteReview(review.id)}
                  className="text-red-600 mt-2"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No reviews yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
