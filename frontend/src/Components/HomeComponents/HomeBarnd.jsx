import React, { useState, useEffect } from "react";
import {
  Calendar,
  Gauge,
  Fuel,
  CheckCircle,
  FuelIcon,
  Car,
  X,
  Eye,
  ArrowRight,
} from "lucide-react";
import api from "../../Utils/api";
import { Link } from "react-router-dom";

export default function KingsMotorsShowcase() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration - replace with your actual API call
  useEffect(() => {
    fetchLatestCars();
  }, []);

  const fetchLatestCars = async () => {
    try {
      const res = await api.get("/latestcars");
      setCars(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch cars:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFuelTypeColor = (fuelType) => {
    switch (fuelType.toLowerCase()) {
      case "petrol":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "diesel":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "hybrid":
      case "plug-in hybrid":
        return "bg-green-50 text-green-700 border-green-200";
      case "electric":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16">
      {/* Header */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
          Premium Collection
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Discover Excellence
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Explore our handpicked premium vehicles—certified for luxury and
          performance. Perfect for your next adventure in Nepal.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <span className="ml-3 text-gray-600">
            Loading premium vehicles...
          </span>
        </div>
      ) : (
        /* Car Grid */
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  {car.certified && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10">
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      Certified
                    </div>
                  )}
                  <img
                    src={car.images[0].url}
                    alt={`${car.name} ${car.model}`}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {car.name} {car.model}
                    </h3>
                    <p className="text-sm text-gray-500">{car.tagline}</p>
                  </div>

                  {/* Price and Fuel Type */}
                  <div className="flex justify-between items-center mb-4">
                    <div
                      className={`px-3 py-1 rounded-lg text-xs font-medium border ${getFuelTypeColor(
                        car.fuelType
                      )}`}
                    >
                      {car.fuelType}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        NRs. {car.price}
                      </div>
                    </div>
                  </div>

                  {/* Car Details */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Gauge className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-xs text-gray-600 font-medium">
                        {car.drivenKms?.toLocaleString()} km
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Car className="w-4 h-4 text-purple-600" />
                      </div>
                      <p className="text-xs text-gray-600 font-medium">
                        {car.transmission}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Calendar className="w-4 h-4 text-orange-600" />
                      </div>
                      <p className="text-xs text-gray-600 font-medium">
                        {car.modelYear}
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleViewDetails(car)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-xl"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedCar.images[0].url}
                alt={`${selectedCar.name} ${selectedCar.model}`}
                className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
              {selectedCar.certified && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Certified
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {selectedCar.name} {selectedCar.model}
                </h2>
                <p className="text-gray-600 mb-4">{selectedCar.tagline}</p>
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  NRs. {selectedCar.price}
                </div>
              </div>

              {/* Detailed Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Year</p>
                  <p className="font-semibold text-gray-900">
                    {selectedCar.modelYear}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Gauge className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Engine</p>
                  <p className="font-semibold text-gray-900">
                    {selectedCar.engine}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Fuel className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Fuel</p>
                  <p className="font-semibold text-gray-900">
                    {selectedCar.fuelType}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Car className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Driven</p>
                  <p className="font-semibold text-gray-900">
                    {selectedCar.drivenKms?.toLocaleString()} km
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-colors duration-200"
                >
                  Close
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  Contact Dealer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discover More Button */}
      <div className="flex items-center justify-center mt-16">
        <Link to="/cars">
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl border border-gray-200 hover:border-gray-300 font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
            Discover More
          </button>
        </Link>
      </div>
    </section>
  );
}
