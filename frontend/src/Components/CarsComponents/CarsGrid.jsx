import React, { useEffect, useState } from "react";
import CarsCard from "../SharedComponents/CarsCard";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import api from "../../Utils/api";

export default function CarsGrid() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  const admin = user?.role;

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await api.get("/all-cars");
      setCars(res.data.data || []);
    } catch (error) {
      console.error("Error fetching cars:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = (car) => {
    alert("Contact Us or leave your details from the Contact section.");
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

  const sortedCars = [...cars].sort((a, b) => (a.sold ? 1 : -1));

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = sortedCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(sortedCars.length / carsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (cars.length === 0)
    return <div className="text-center text-lg">No cars available.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-20 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className="text-3xl md:text-6xl font-extrabold">
            Premium Second Hand Cars
          </div>
          <div className="max-w-3xl text-base md:text-xl font-extralight text-center">
            Experience comfort and quality without the new car price tag.
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
          {currentCars.map((car) => (
            <CarsCard
              key={car._id}
              car={car}
              onOrderClick={handleOrderClick}
              onCarDeleted={handleCarDeleted}
              onCarSold={handleCarSold}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-slate-200 rounded-md disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-slate-200 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
