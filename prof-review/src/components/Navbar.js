import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">RHIT Prof Review</h1>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/courses" className="hover:underline">Courses</Link>
          <Link href="/profs" className="hover:underline">Professors</Link>
        </div>
      </div>
    </nav>
  );
}
