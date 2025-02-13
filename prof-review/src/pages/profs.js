import { useEffect, useState } from "react";
import { getProfessors } from "../utils/firestore";

export default function Professors() {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const profData = await getProfessors();
      setProfessors(profData);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Professors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professors.map((prof) => (
          <div key={prof.id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold">{prof.name}</h2>
            <p className="text-gray-600">{prof.department}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
