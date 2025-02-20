export default function ReviewModal({ item, reviews, type, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
          <h2 className="text-3xl font-bold">{item.name}</h2>
          <p className="text-gray-700">{type === "course" ? item.department : item.departments.join(", ")}</p>
  
          <button onClick={onClose} className="absolute top-2 right-4 text-xl">✖</button>
  
          <h3 className="text-2xl font-semibold mt-6">Student Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="bg-gray-100 p-4 rounded-lg mt-2">
                <p>{review.comments}</p>
                <p className="text-sm text-gray-500">{review.tags?.join(", ") || "No tags"}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No reviews yet.</p>
          )}
  
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit a Review
          </button>
        </div>
      </div>
    );
  }
  