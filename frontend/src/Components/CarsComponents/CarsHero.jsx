import React from "react";

export default function CarsHero() {
  return (
    <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/Upload/why.jpeg"
          alt="King Motors Luxury"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-end">
        <div className="backdrop-blur-sm bg-black/30 py-6 px-4 sm:py-8 sm:px-6 md:px-0">
          <div className="container mx-auto max-w-6xl">
            {/* Main Heading */}
            <div className="mb-3 sm:mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                Premium Second Hand Cars
              </h1>
            </div>

            {/* Description */}
            <div className="max-w-xl md:max-w-3xl">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-gray-100 leading-relaxed">
                Explore our exclusive collection of premium second-hand cars,
                each thoroughly inspected to deliver exceptional performance,
                reliability, and value you can trust.
              </p>
            </div>

            {/* Features Pills */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                ✓ Thoroughly Inspected
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                ✓ Warranty Included
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                ✓ Premium Quality
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full opacity-80"></div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </div>
  );
}
