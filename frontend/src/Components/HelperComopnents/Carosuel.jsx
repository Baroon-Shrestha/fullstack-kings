import React, { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({
  testimonials = [],
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay, testimonials.length, autoPlayInterval]);

  const getPrevIndex = () =>
    currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;

  const getNextIndex = () =>
    currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;

  if (!testimonials.length) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-2xl">
        <p className="text-gray-500">No testimonials available</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-7xl mx-auto"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Mobile */}
      <div className="block lg:hidden">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <div className="bg-white border border-gray-100 shadow-xl rounded-2xl">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={t.productImage}
                      alt={`Product for ${t.clientName}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) =>
                        (e.target.src = "/api/placeholder/400/300")
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  <div className="p-8 md:p-10 text-center relative">
                    {/* Background Quote Icon */}
                    <Quote className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-emerald-100 opacity-10 w-16 h-16" />

                    <blockquote className="relative text-gray-700 text-lg md:text-xl italic font-light leading-relaxed max-w-3xl mx-auto z-10">
                      "{t.review}"
                    </blockquote>
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h4 className="text-xl md:text-2xl font-bold text-gray-900">
                        {t.clientName}
                      </h4>
                      <p className="text-emerald-600 font-semibold text-base md:text-lg">
                        {t.designation}
                      </p>
                      {t.company && (
                        <p className="text-gray-500 text-sm mt-1">
                          {t.company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="relative flex items-center justify-center min-h-[600px] px-4">
          {/* Previous */}
          <div
            className="absolute left-0 w-80 transform -translate-x-8 scale-75 opacity-60 transition-all duration-700 ease-out cursor-pointer hover:scale-80 hover:opacity-80 z-10"
            onClick={() => setCurrentIndex(getPrevIndex())}
          >
            <div className="bg-white border border-gray-100 shadow-xl rounded-2xl">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={testimonials[getPrevIndex()].productImage}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "/api/placeholder/400/300")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-6 text-center relative">
                <Quote className="absolute top-0 left-1/2 -translate-x-1/2 text-emerald-100 opacity-10 w-10 h-10" />
                <blockquote className="relative text-sm italic font-light text-gray-700 line-clamp-3">
                  "{testimonials[getPrevIndex()].review.substring(0, 100)}..."
                </blockquote>
                <h4 className="mt-3 text-lg font-bold text-gray-900">
                  {testimonials[getPrevIndex()].clientName}
                </h4>
                <p className="text-sm text-emerald-600">
                  {testimonials[getPrevIndex()].designation}
                </p>
              </div>
            </div>
          </div>

          {/* Current */}
          <div className="relative w-full max-w-2xl mx-auto z-20 transition-all duration-700 ease-out">
            <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={testimonials[currentIndex].productImage}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  onError={(e) => (e.target.src = "/api/placeholder/400/300")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="p-10 text-center relative">
                <Quote className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-emerald-100 opacity-10 w-20 h-20" />
                <blockquote className="relative text-xl italic font-light text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  "{testimonials[currentIndex].review}"
                </blockquote>
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h4 className="text-2xl font-bold text-gray-900">
                    {testimonials[currentIndex].clientName}
                  </h4>
                  <p className="text-emerald-600 font-semibold text-lg">
                    {testimonials[currentIndex].designation}
                  </p>
                  {testimonials[currentIndex].company && (
                    <p className="text-gray-500 text-sm mt-1">
                      {testimonials[currentIndex].company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Next */}
          <div
            className="absolute right-0 w-80 transform translate-x-8 scale-75 opacity-60 transition-all duration-700 ease-out cursor-pointer hover:scale-80 hover:opacity-80 z-10"
            onClick={() => setCurrentIndex(getNextIndex())}
          >
            <div className="bg-white border border-gray-100 shadow-xl rounded-2xl">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={testimonials[getNextIndex()].productImage}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "/api/placeholder/400/300")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-6 text-center relative">
                <Quote className="absolute top-0 left-1/2 -translate-x-1/2 text-emerald-100 opacity-10 w-10 h-10" />
                <blockquote className="relative text-sm italic font-light text-gray-700 line-clamp-3">
                  "{testimonials[getNextIndex()].review.substring(0, 100)}..."
                </blockquote>
                <h4 className="mt-3 text-lg font-bold text-gray-900">
                  {testimonials[getNextIndex()].clientName}
                </h4>
                <p className="text-sm text-emerald-600">
                  {testimonials[getNextIndex()].designation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      {showArrows && testimonials.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex(getPrevIndex())}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 z-30"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => setCurrentIndex(getNextIndex())}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 z-30"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </>
      )}
    </div>
  );
}
