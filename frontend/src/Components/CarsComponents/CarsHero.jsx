import React from "react";

export default function CarsHero() {
  return (
    <div className="relative h-[60vh] bg-cover bg-center">
      <img
        src="/Upload/why.jpeg"
        alt="King Motors Luxury"
        className="w-full h-96 object-cover"
      />
      <div className="absolute bottom-0 w-full">
        <div className="backdrop-blur-md bg-black/40 py-8 px-6 md:px-0">
          <div className="container mx-auto">
            <div className="text-3xl md:text-6xl font-extrabold text-white">
              Premium Second Hand Cars
            </div>
            <div className="max-w-3xl text-base md:text-xl font-extralight text-white">
              Explore our exclusive collection of premium second-hand cars, each
              thoroughly inspected to deliver exceptional performance,
              reliability, and value you can trust.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
