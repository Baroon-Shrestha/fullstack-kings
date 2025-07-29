import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      image: "/ezgif.com-gif-maker-98-5.webp",
    },
    {
      id: 2,
      image: "/All-New-Dzire-Popular-Maruti-3.jpg",
    },
    {
      id: 3,
      image: "/MahindraBe6E-1-600x400.webp",
    },
  ];

  const carBrands = [
    { name: "Honda", logo: "/Uploads/honda.png" },
    { name: " TATA", logo: "/Uploads/tata.avif" },
    { name: "Nissan", logo: "/Upload/nissan.png" },
    { name: "Jeep", logo: "/Uploads/Jeep.jpg" },
    { name: "Ford", logo: "/Uploads/ford.jpeg" },
    { name: "Hyundai", logo: "/Uploads/hyundai.jpeg" },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        handleSlideChange((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const handleSlideChange = (newSlideIndex) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide(
      typeof newSlideIndex === "function" ? newSlideIndex : newSlideIndex
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <>
      {/* Hero Carousel Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Images with Enhanced Transitions */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            const isPrevious =
              index === (currentSlide - 1 + slides.length) % slides.length;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-[800ms] ease-in-out ${
                  isActive
                    ? "opacity-100 translate-x-0 scale-100"
                    : isPrevious
                    ? "opacity-0 -translate-x-full scale-105"
                    : "opacity-0 translate-x-full scale-95"
                }`}
              >
                <img
                  src={slide.image}
                  alt="King Motors Recondition"
                  className="w-full h-full object-cover transform transition-transform duration-[800ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-7xl font-extrabold mb-6 text-white">
              Kings Motor Company Pvt. Ltd
            </h1>

            <p className="text-lg md:text-xl mb-8 font-extralight text-gray-200 max-w-2xl mx-auto">
              Your trusted partner for quality reconditioned vehicles
            </p>

            <Link to="/cars">
              <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300">
                Explore Our Cars
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Car Brands Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium Reconditioned Brands
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed font-extralight">
              Discover our extensive collection of expertly reconditioned
              premium automotive brands
            </p>
          </div>

          {/* Enhanced Infinite Horizontal Carousel */}
          <div className="relative">
            <div className="flex animate-scroll">
              {/* First set of brands */}
              {carBrands.map((brand, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-8 group cursor-pointer"
                >
                  <div className="w-40 h-40 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 flex items-center justify-center border border-gray-200 group-hover:border-red-300 relative overflow-hidden">
                    <div className="text-center relative z-10">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-20 h-20 object-contain mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="text-base font-bold text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                        {brand.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Second set of brands for infinite loop */}
              {carBrands.map((brand, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-8 group cursor-pointer"
                >
                  <div className="w-40 h-40 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 flex items-center justify-center border border-gray-200 group-hover:border-red-300 relative overflow-hidden">
                    <div className="text-center relative z-10">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-20 h-20 object-contain mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="text-base font-bold text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                        {brand.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
  .text-shadow-xl {
    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.7), 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-scroll {
    animation: scroll 20s linear infinite;
  }

  @media (max-width: 768px) {
    .animate-scroll {
      animation-duration: 25s;
    }
  }

  @media (max-width: 480px) {
    .animate-scroll {
      animation-duration: 18s;
    }
  }

  .animate-scroll:hover {
    animation-play-state: paused;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }
`}</style>
    </>
  );
}
