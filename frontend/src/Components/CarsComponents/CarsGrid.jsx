import React, { useEffect, useState } from "react";
import CarsCard from "../SharedComponents/CarsCard";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAuth } from "../Context/AuthContext";

export default function CarsGrid() {
  const { user } = useAuth(); // ✅ Get user from context
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const admin = user?.role;

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/all-cars");
      setCars(res.data.data || []);
    } catch (error) {
      console.error("Error fetching cars:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = (car) => {
    alert(`Order placed for ${car.name} ${car.model}!`);
  };

  const handleCarSold = (id) => {
    setCars((prev) =>
      prev.map((car) => (car._id === id ? { ...car, sold: true } : car))
    );
  };

  const handleAddCar = () => {
    navigate("/add-car");
  };

  const handleCarDeleted = (id) => {
    setCars((prev) => prev.filter((car) => car._id !== id));
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (cars.length === 0)
    return <div className="text-center text-lg">No cars available.</div>;

  const sortedCars = [...cars].sort((a, b) => {
    if (a.sold === b.sold) return 0;
    return a.sold ? 1 : -1; // move sold cars to the end
  });

  return (
    <div className="min-h-screen bg-gray-50 py-20 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className="text-3xl md:text-6xl font-extrabold">
            Premium Second Hand Cars
          </div>
          <div className="max-w-3xl text-base md:text-xl font-extralight text-center">
            Experience the comfort and quality of high-end vehicles without the
            new car price tag. Our certified pre-owned cars are built to
            impress.
          </div>
        </div>

        {admin && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleAddCar}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Car
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCars.map((car) => (
            <CarsCard
              key={car._id}
              car={car}
              onOrderClick={handleOrderClick}
              onCarDeleted={handleCarDeleted} // ✅ added
              onCarSold={handleCarSold}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
