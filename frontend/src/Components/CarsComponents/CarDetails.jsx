import { useEffect, useState } from "react";
import {
  Car,
  Fuel,
  Calendar,
  Gauge,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  Shield,
  Award,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  Eye,
  Users,
  DoorOpen,
  Palette,
  Settings,
  CheckCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function CarDetails() {
  const { id } = useParams();
  const [carDesc, setCarDesc] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState("next");
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/car/${id}`);
        setCarDesc(res.data.data);
      } catch (err) {
        console.error("Failed to fetch car details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  const images = carDesc && Array.isArray(carDesc.images) ? carDesc.images : [];

  useEffect(() => {
    if (images.length <= 1 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setSlideDirection("next");
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying]);

  const goBack = () => {
    return navigate(-1);
  };

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

  const goToImage = (index) => {
    setSlideDirection(index > currentImageIndex ? "next" : "prev");
    setCurrentImageIndex(index);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const getConditionIcon = (condition) => {
    switch (condition) {
      case "Excellent":
        return <Award className="w-4 h-4 text-green-500" />;
      case "Like New":
        return <Star className="w-4 h-4 text-yellow-500" />;
      case "Good":
        return <Check className="w-4 h-4 text-blue-500" />;
      default:
        return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!carDesc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Car not found!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header with Navigation */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={goBack}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isLiked
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Gallery (Fixed) */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit lg:self-start">
            {/* Main Image Carousel */}
            <div
              className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full h-full">
                {images.map((image, index) => {
                  const isActive = index === currentImageIndex;
                  const isPrev =
                    index === currentImageIndex - 1 ||
                    (currentImageIndex === 0 && index === images.length - 1);

                  let transformClass = "translate-x-full opacity-0";
                  if (isActive) transformClass = "translate-x-0 opacity-100";
                  else if (isPrev)
                    transformClass = "-translate-x-full opacity-0";

                  const imageUrl =
                    typeof image === "string"
                      ? image
                      : image?.url || "/fallback.jpg";

                  return (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`${carDesc.model} ${carDesc.name} - Image ${
                        index + 1
                      }`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${transformClass}`}
                    />
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentImageIndex + 1}/{images.length}
                </div>
              )}

              {/* Image Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex
                          ? "bg-white scale-125 shadow-lg"
                          : "bg-white/60 hover:bg-white/80 hover:scale-110"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.slice(0, 6).map((image, index) => {
                  const imageUrl =
                    typeof image === "string"
                      ? image
                      : image?.url || "/fallback.jpg";
                  return (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? "border-blue-500 shadow-lg scale-105"
                          : "border-gray-200 hover:border-gray-300 hover:scale-102"
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
                {images.length > 6 && (
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg border-2 border-gray-200 bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium">
                    +{images.length - 6}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Car Details */}
          <div className="space-y-6">
            {/* Car Title and Price */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 capitalize leading-tight">
                    {carDesc.model} {carDesc.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{carDesc.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    NPR{" "}
                    {carDesc?.price ? carDesc.price.toLocaleString() : "N/A"}
                  </p>
                  <p className="text-gray-500 text-sm">Fixed Price</p>
                </div>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                <SpecCard
                  icon={<Calendar className="w-5 h-5" />}
                  label="Year"
                  value={carDesc.modelYear}
                />
                <SpecCard
                  icon={<Gauge className="w-5 h-5" />}
                  label="Mileage"
                  value={
                    carDesc?.drivenKms !== undefined
                      ? `${carDesc.drivenKms.toLocaleString()} km`
                      : "N/A"
                  }
                />
                <SpecCard
                  icon={<Fuel className="w-5 h-5" />}
                  label="Fuel Type"
                  value={carDesc.fuelType}
                />
                <SpecCard
                  icon={<Car className="w-5 h-5" />}
                  label="Transmission"
                  value={carDesc.transmission}
                />
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Vehicle Details
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <DetailRow
                  icon={<Settings />}
                  label="Engine"
                  value={carDesc.engine}
                />
                <DetailRow
                  icon={getConditionIcon(carDesc.condition)}
                  label="Condition"
                  value={carDesc.condition}
                />
                <DetailRow
                  icon={<Car />}
                  label="Body Type"
                  value={carDesc.bodyType}
                />
                <DetailRow
                  icon={<Palette />}
                  label="Color"
                  value={carDesc.color}
                />
                <DetailRow
                  icon={<Users />}
                  label="Seats"
                  value={carDesc.seats}
                />
                <DetailRow
                  icon={<DoorOpen />}
                  label="Doors"
                  value={carDesc.doors}
                />
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {Array.isArray(carDesc?.features) &&
                carDesc.features.length > 0 ? (
                  carDesc.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No features listed.
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ActionButton
                label="Call Now"
                icon={<Phone className="w-4 h-4" />}
                color="blue"
                primary
              />
              <ActionButton
                label="Message"
                icon={<MessageCircle className="w-4 h-4" />}
                color="green"
                primary
              />
            </div>

            {/* Dealer Info */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  K
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg">
                    Kings Motor Company PVT. LTD
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 text-sm font-medium">
                      Licensed Dealer
                    </span>
                    <span className="text-gray-400">•</span>
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-600 text-sm font-medium">
                      Verified Seller
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 text-sm">
                      Located in {carDesc.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced UI Components
function SpecCard({ icon, label, value }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <div className="text-blue-600 flex-shrink-0">{icon}</div>
        <div className="min-w-0">
          <p className="text-lg font-bold text-gray-900 truncate">{value}</p>
          <p className="text-gray-600 text-sm">{label}</p>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="text-gray-500">{icon}</div>
        <span className="text-gray-600 font-medium">{label}</span>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}

function ActionButton({ label, icon, color, primary, border }) {
  const colorClasses = {
    blue: primary
      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
      : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200",
    green: primary
      ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl"
      : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200",
  };

  return (
    <button
      className={`${
        border
          ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-white"
          : colorClasses[color]
      } py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5`}
    >
      {icon}
      {label}
    </button>
  );
}
