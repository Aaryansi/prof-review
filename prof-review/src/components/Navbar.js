import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full px-8 py-4 bg-white bg-opacity-60 backdrop-blur-lg shadow-md flex justify-between items-center z-50">
      <h1 className="text-gray-900 text-2xl font-bold tracking-wide">RHIT Prof Review</h1>
      <div className="space-x-6 text-gray-800 font-medium">
        <Link href="/" className="hover:text-red-500 transition">Home</Link>
        <Link href="/courses" className="hover:text-red-500 transition">Courses</Link>
        <Link href="/profs" className="hover:text-red-500 transition">Professors</Link>
        <Link href="/reviews" className="hover:text-red-500 transition">Reviews</Link>
        <Link href="/review">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition">
            Submit Review
          </button>
        </Link>
      </div>
    </nav>
  );
}
