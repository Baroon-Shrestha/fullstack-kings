import { useState, useEffect } from "react";
import {
  Fuel,
  Gauge,
  Car,
  Eye,
  Zap,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  Shield,
  Award,
  MapPin,
  MoreVertical,
  Trash2,
  CheckCircle,
  Pencil,
  Heart,
  Share2,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../../Utils/api";

export default function CarsCard({
  car,
  onOrderClick,
  onCarDeleted,
  onCarSold,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState("next");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();

  const admin = user?.role;

  const images = Array.isArray(car.images) ? car.images : [];

  // Auto-play carousel
  useEffect(() => {
    if (images.length <= 1 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setSlideDirection("next");
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying]);

  const nextImage = () => {
    if (images.length > 0) {
      setSlideDirection("next");
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setSlideDirection("prev");
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  // Handle direct dot navigation
  const goToImage = (index) => {
    setSlideDirection(index > currentImageIndex ? "next" : "prev");
    setCurrentImageIndex(index);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const formatPrice = (price) => `NPR ${(price / 100000).toFixed(1)}L`;

  const getConditionColor = (condition) => {
    switch (condition) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Like New":
        return "bg-blue-100 text-blue-800";
      case "Good":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConditionIcon = (condition) => {
    switch (condition) {
      case "Excellent":
        return <Award className="w-3 h-3" />;
      case "Like New":
        return <Star className="w-3 h-3" />;
      case "Good":
        return <Check className="w-3 h-3" />;
      default:
        return <Shield className="w-3 h-3" />;
    }
  };

  // Get current image URL or fallback (kept for backward compatibility)
  const getCurrentImageUrl = () => {
    if (images.length === 0) return "/fallback.jpg";

    const currentImage = images[currentImageIndex];
    // Handle both string URLs and objects with url property
    if (typeof currentImage === "string") {
      return currentImage;
    }
    return currentImage?.url || "/fallback.jpg";
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Car deleted successfully!");
      onCarDeleted?.(id);
      // Optional: trigger a refresh (if parent handles it) or notify via props
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete car.");
    }
  };

  const handleMarkSold = async (id) => {
    try {
      await api.patch(`/mark-sold/${id}`, {
        withCredentials: true,
      });
      toast.success("Car marked as sold");
      onCarSold?.(id); // Notify parent to update list
    } catch (err) {
      toast.error("Failed to mark car as sold");
      console.error(err);
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      {/* Image Carousel Section */}
      <div
        className="relative h-56 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container with Slide Animation */}
        <div className="relative w-full h-full">
          {images.map((image, index) => {
            const isActive = index === currentImageIndex;
            const isPrev =
              index === currentImageIndex - 1 ||
              (currentImageIndex === 0 && index === images.length - 1);
            const isNext =
              index === currentImageIndex + 1 ||
              (currentImageIndex === images.length - 1 && index === 0);

            let transformClass = "translate-x-full opacity-0";

            if (isActive) {
              transformClass = "translate-x-0 opacity-100";
            } else if (isPrev) {
              transformClass = "-translate-x-full opacity-0";
            }

            const imageUrl =
              typeof image === "string" ? image : image?.url || "/fallback.jpg";

            return (
              <img
                key={index}
                src={imageUrl}
                alt={`${car.name} ${car.model} - Image ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${transformClass}`}
              />
            );
          })}
          {car.sold && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
              <div className="text-3xl font-extrabold text-white bg-red-600 px-6 py-2 rounded-xl shadow-xl">
                SOLD OUT
              </div>
            </div>
          )}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Image Indicators/Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/60 hover:bg-white/80 hover:scale-110"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
            {currentImageIndex + 1}/{images.length}
          </div>
        )}

        {/* Condition badge */}
        <div className="absolute top-4 left-4 flex justify-between items-start">
          <div
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${getConditionColor(
              car.condition
            )}`}
          >
            {getConditionIcon(car.condition)}
            {car.condition}
          </div>
        </div>
      </div>

      {/* Car Details */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1 capitalize">
            {car.name} {car.model}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {formatPrice(car.price)}
            </p>
            <span className="text-sm text-gray-500">{car.modelYear} Model</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Fuel className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600 font-medium">{car.fuelType}</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Gauge className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600 font-medium">
              {car.drivenKms?.toLocaleString()} km
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Car className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-xs text-gray-600 font-medium">
              {car.transmission}
            </p>
          </div>
        </div>

        {/* Updated Button Section */}
        <div className="space-y-4">
          {admin ? (
            <>
              {/* Admin Actions Row */}
              <div className="flex gap-3 items-center justify-center">
                <Link to={`/car/${car._id}`}>
                  <button className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white py-3.5 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group">
                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>View Details</span>
                  </button>
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 rounded-2xl p-3.5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 border border-slate-200"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 bottom-full mb-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden backdrop-blur-sm">
                      <div className="p-2 space-y-1">
                        <button
                          onClick={() => handleDelete(car._id)}
                          className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm flex items-center gap-3 rounded-xl transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </div>
                          <span className="font-medium text-gray-700">
                            Delete Car
                          </span>
                        </button>
                        <button
                          onClick={() => handleMarkSold(car._id)}
                          className="w-full text-left px-4 py-3 hover:bg-amber-50 text-sm flex items-center gap-3 rounded-xl transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                            <CheckCircle className="w-4 h-4 text-amber-600" />
                          </div>
                          <span className="font-medium text-gray-700">
                            Mark Sold
                          </span>
                        </button>
                        <Link to={`/update-car/${car._id}`}>
                          <button className="w-full text-left px-4 py-3 hover:bg-blue-50 text-sm flex items-center gap-3 rounded-xl transition-all duration-200 group">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              <Pencil className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-700">
                              Edit Details
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Main Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Link to={`/car/${car._id}`} className="block">
                  <button className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white py-4 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform relative z-10" />
                    <span className="relative z-10">View Details</span>
                  </button>
                </Link>

                <button
                  disabled={car.sold}
                  onClick={() => onOrderClick?.(car)}
                  className={`w-full bg-gradient-to-r from-[#C56029] to-[#F5B727] text-white py-4 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg transform hover:-translate-y-0.5 group relative overflow-hidden ${
                    car.sold ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Order Now</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
