// CarDetailsModal.jsx
import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  Car,
  Fuel,
  Calendar,
  Gauge,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Award,
  Star,
  Check,
  Shield,
  X,
} from "lucide-react";

export default function CarDetailsModal({ car, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getConditionIcon = (condition) => {
    switch (condition) {
      case "Excellent":
        return <Award className="w-4 h-4" />;
      case "Like New":
        return <Star className="w-4 h-4" />;
      case "Good":
        return <Check className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-lg relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Carousel */}
        <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-t-2xl">
          <img
            src={car.images[currentImageIndex]}
            alt={`${car.name} ${car.model}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() =>
              setCurrentImageIndex(
                (prev) => (prev - 1 + car.images.length) % car.images.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {car.name} {car.model}
              </h2>
              <p className="text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> {car.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                NPR {car.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Fixed Price</p>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Calendar className="mx-auto text-blue-600" />
              <p className="font-semibold">{car.year}</p>
              <p className="text-sm text-gray-500">Year</p>
            </div>
            <div className="text-center">
              <Gauge className="mx-auto text-purple-600" />
              <p className="font-semibold">{car.kmsRan.toLocaleString()} KM</p>
              <p className="text-sm text-gray-500">Mileage</p>
            </div>
            <div className="text-center">
              <Fuel className="mx-auto text-green-600" />
              <p className="font-semibold">{car.fuelType}</p>
              <p className="text-sm text-gray-500">Fuel Type</p>
            </div>
            <div className="text-center">
              <Car className="mx-auto text-orange-600" />
              <p className="font-semibold">{car.transmission}</p>
              <p className="text-sm text-gray-500">Transmission</p>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-2">Key Features</h4>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {car.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center text-sm text-gray-700 gap-2"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between border-b py-2 text-sm">
                <span className="text-gray-500">Engine</span>
                <span>{car.engine}</span>
              </div>
              <div className="flex justify-between border-b py-2 text-sm">
                <span className="text-gray-500">Condition</span>
                <span>{car.condition}</span>
              </div>
              <div className="flex justify-between border-b py-2 text-sm">
                <span className="text-gray-500">Body Type</span>
                <span>{car.bodyType}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between border-b py-2 text-sm">
                <span className="text-gray-500">Color</span>
                <span>{car.color}</span>
              </div>
              <div className="flex justify-between border-b py-2 text-sm">
                <span className="text-gray-500">Seats</span>
                <span>{car.seats}</span>
              </div>
              <div className="flex justify-between border-b py-2 text-sm">
                <span className="text-gray-500">Doors</span>
                <span>{car.doors}</span>
              </div>
            </div>
          </div>

          {/* Dealer Info */}
          <div className="bg-gray-100 rounded-md p-4">
            <p className="font-medium">{car.dealer}</p>
            <p className="text-sm text-gray-600">
              Licensed Dealer • Verified Seller
            </p>
            <p className="text-sm text-gray-600">Located in {car.location}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Call Now
            </button>
            <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
