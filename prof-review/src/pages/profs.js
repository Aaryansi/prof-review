import { useEffect, useState } from "react";
import { getProfessors, getReviewsByProfessor, deleteReview } from "../utils/firestore";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function Professors() {
  const [professors, setProfessors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profData = await getProfessors();
        setProfessors(profData);
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProfessor) {
      getReviewsByProfessor(selectedProfessor.id).then(setReviews);
    }
  }, [selectedProfessor]);

  const departments = [...new Set(professors.flatMap((prof) => prof.departments || []))];

  const filteredProfessors = professors.filter(
    (prof) =>
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prof.departments || []).some((dept) => dept.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="relative flex flex-col items-center min-h-screen px-6 py-10 bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">Browse Professors</h1>
      <p className="text-lg text-gray-600 mb-6">Search for professors or filter by department.</p>

      {/* Search Bar */}
      <div className="relative w-full md:w-1/2">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for a professor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-12 border rounded-xl shadow-lg bg-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
        />
      </div>

      {/* Department Filter */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {departments.map((dept) => (
          <button
            key={dept}
            className={`px-4 py-2 rounded-lg text-gray-900 font-semibold transition ${
              selectedDepartment === dept ? "bg-red-600 text-white" : "bg-white shadow-md hover:bg-red-100"
            }`}
            onClick={() => setSelectedDepartment(dept === selectedDepartment ? "" : dept)}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Professors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredProfessors.map((prof) => (
          <div
            key={prof.id}
            onClick={() => setSelectedProfessor(prof)}
            className="glass-card cursor-pointer hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-semibold text-gray-900">{prof.name}</h2>
            <p className="text-gray-600">{(prof.departments || []).join(", ") || "Unknown Department"}</p>
          </div>
        ))}
      </div>

      {selectedProfessor && (
        <div className="mt-12 p-6 bg-white/50 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold">{selectedProfessor.name}</h2>
          <p className="text-gray-700">{(selectedProfessor.departments || []).join(", ")}</p>

          <Link href={`/review?professor=${selectedProfessor.id}`}>
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
