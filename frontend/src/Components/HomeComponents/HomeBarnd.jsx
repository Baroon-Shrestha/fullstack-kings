import React, { useState } from "react";
import { Calendar, Gauge, Fuel, Award, CheckCircle } from "lucide-react";

export default function KingsMotorsShowcase() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showGrid, setShowGrid] = useState(true);

  const cars = [
    {
      name: "Ford Ranger Wildtrak",
      tagline: "Built Ford Tough – Ready for Any Terrain",
      modelYear: "2024",
      kmsRan: "12,450 km",
      fuelType: "Diesel",
      mileage: "8.9 L/100km",
      power: "210 hp",
      price: "रु 1,09,00,000", // Approx in Nepal
      certified: true,
      image: "/ford-ranger-wildtrak-x.jpg",
      description:
        "The Ford Ranger Wildtrak blends rugged utility with advanced technology. Perfect for adventure and city life alike, with superior towing and a comfortable cabin.",
    },
    {
      name: "Honda Civic",
      tagline: "Sophisticated Style Meets Performance",
      modelYear: "2023",
      kmsRan: "18,200 km",
      fuelType: "Petrol",
      mileage: "12.75 km/L",
      power: "158 hp",
      price: "रु 89,00,000", // Approx in Nepal
      certified: true,
      image: "/2026_honda_civic_sedan_si_fq_oem_1_1600.avif",
      description:
        "The Honda Civic boasts a bold design and advanced safety features. A perfect choice for city driving and weekend getaways with great efficiency.",
    },
    {
      name: "Škoda Octavia",
      tagline: "Simply Clever – The Family Sedan",
      modelYear: "2024",
      kmsRan: "8,750 km",
      fuelType: "Petrol",
      mileage: "15-18 km/L",
      power: "148 hp",
      price: "रु 1,15,00,000", // Approx in Nepal
      certified: true,
      image: "/grey-scoda-octavia-left-right-260nw-2557014071.webp",
      description:
        "The Škoda Octavia offers spacious interiors and modern tech for a comfortable family drive. Known for its durability and fuel efficiency.",
    },
    {
      name: "BMW i5",
      tagline: "The Future of Driving – Electrified Luxury",
      modelYear: "2023",
      kmsRan: "15,600 km",
      fuelType: "Electric",
      mileage: "296 mi range (WLTP)",
      power: "335 hp",
      price: "रु 2,50,00,000", // Approx in Nepal
      certified: true,
      image: "/i5-exterior-right-front-three-quarter-5.avif",
      description:
        "The BMW i5 redefines electric luxury with cutting-edge technology and exhilarating performance. Perfect for those demanding innovation and style.",
    },
    {
      name: "BYD Song Plus",
      tagline: "Electrifying Every Journey",
      modelYear: "2024",
      kmsRan: "5,920 km",
      fuelType: "Electric",
      mileage: "505 km range (NEDC)",
      power: "184 hp",
      price: "रु 92,50,000", // Approx in Nepal
      certified: true,
      image: "/byd-song-l-back-precio.jpg",
      description:
        "The BYD Song Plus delivers an impressive range and premium features. A practical choice for urban commuters looking for sustainability.",
    },
    {
      name: "Mitsubishi Outlander",
      tagline: "Redefining SUV Luxury",
      modelYear: "2023",
      kmsRan: "22,100 km",
      fuelType: "Plug-in Hybrid",
      mileage: "74 MPGe (PHEV)",
      power: "248 hp",
      price: "रु 1,35,00,000", // Approx in Nepal
      certified: true,
      image: "/2025-mitsubishi-outlander-sel-104-6813d429cde8a.avif",
      description:
        "The Mitsubishi Outlander offers a perfect blend of hybrid efficiency and SUV luxury. Versatile for city drives and rugged trails.",
    },
  ];

  const getFuelTypeColor = (fuelType) => {
    switch (fuelType.toLowerCase()) {
      case "petrol":
        return "bg-blue-100 text-blue-800";
      case "diesel":
        return "bg-yellow-100 text-yellow-800";
      case "hybrid":
      case "plug-in hybrid":
        return "bg-green-100 text-green-800";
      case "electric":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleBack = () => {
    setSelectedCar(null);
    setTimeout(() => setShowGrid(true), 300);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-50 py-20 relative">
      {/* Header */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow">
          <Award className="w-4 h-4" />
          KINGS MOTOR PREMIUM COLLECTION
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-6">
          Discover Excellence
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
          Explore our handpicked premium vehicles—certified for luxury and
          performance. Perfect for your next adventure in Nepal.
        </p>
      </div>

      {/* Cars Grid */}
      {showGrid && (
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {cars.map((car, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-300 overflow-hidden relative hover:scale-105"
              >
                {/* Certified Badge */}
                {car.certified && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    Certified
                  </div>
                )}
                {/* Image */}
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                />
                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {car.name}
                  </h3>
                  <p className="text-sm text-gray-500">{car.tagline}</p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getFuelTypeColor(
                        car.fuelType
                      )}`}
                    >
                      {car.fuelType}
                    </span>
                    <span className="font-bold text-xl text-gray-900">
                      {car.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {car.description}
                  </p>
                  <button
                    onClick={() => {
                      setShowGrid(false);
                      setSelectedCar(car);
                    }}
                    className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition duration-300 shadow-md hover:shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Small Detail Card */}
      {selectedCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-sm p-4 relative">
            <img
              src={selectedCar.image}
              alt={selectedCar.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h2 className="text-xl font-bold text-gray-800">
              {selectedCar.name}
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              {selectedCar.description}
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-blue-500" />
                Year: {selectedCar.modelYear}
              </div>
              <div className="flex items-center gap-1">
                <Gauge className="w-4 h-4 text-purple-500" />
                Power: {selectedCar.power}
              </div>
              <div className="flex items-center gap-1">
                <Fuel className="w-4 h-4 text-green-500" />
                Fuel: {selectedCar.fuelType}
              </div>
              <div>Mileage: {selectedCar.mileage}</div>
            </div>
            <div className="mt-2 text-lg font-bold text-blue-600">
              {selectedCar.price}
            </div>
            <button
              onClick={handleBack}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium text-sm"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
