// CarDetails.jsx
import { useParams, useNavigate } from "react-router-dom";

import { ChevronLeft } from "lucide-react";
import sampleCars from "./Sample";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const car = sampleCars.find((c) => c.id === Number(id));

  if (!car) return <div className="p-10">Car not found!</div>;

  console.log(car);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:underline mb-4"
      >
        <ChevronLeft />
        Go Back
      </button>

      <h1 className="text-3xl font-bold mb-2">
        {car.name} - {car.model}
      </h1>
      <p className="text-gray-600 mb-6">
        {car.year} | {car.location}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          //   src={car?.images?.[0] || car.image}
          src={`/${car.image}`}
          alt={car.name}
          className="w-full rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-xl font-semibold mb-3">Details</h2>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>
              <strong>Fuel Type:</strong> {car.fuelType}
            </li>
            <li>
              <strong>Kilometers Driven:</strong> {car.kmsRan.toLocaleString()}{" "}
              km
            </li>
            <li>
              <strong>Transmission:</strong> {car.transmission}
            </li>
            <li>
              <strong>Engine:</strong> {car.engine}
            </li>
            <li>
              <strong>Color:</strong> {car.color}
            </li>
            <li>
              <strong>Seats:</strong> {car.seats}
            </li>
            <li>
              <strong>Condition:</strong> {car.condition}
            </li>
            <li>
              <strong>Dealer:</strong> {car.dealer}
            </li>
          </ul>

          <h3 className="mt-6 font-bold">Features:</h3>
          <ul className="list-disc list-inside text-sm mt-1">
            {car.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
