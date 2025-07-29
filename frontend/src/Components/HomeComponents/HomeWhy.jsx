import React from "react";
import { CheckCircle, Award, Users, Star } from "lucide-react";

export default function HomeWhy() {
  const features = [
    {
      icon: <Award className="w-5 h-5" />,
      text: "20+ Years of Excellence",
    },
    {
      icon: <Star className="w-5 h-5" />,
      text: "Premium Quality Vehicles",
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Trusted by Thousands",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Award-winning Designs",
    },
  ];

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-28">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-slate-100"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Section */}
          <div className="lg:w-1/2 space-y-6">
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Why{" "}
              <span className="bg-[#FE9C30] bg-clip-text text-transparent">
                King Motor?
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C56029] to-[#F5B727] rounded-full mb-4"></div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-lg">
              For over{" "}
              <span className="font-semibold text-blue-600">two decades</span>,
              King Motors has set the standard for luxury vehicles in Nepal. Our
              commitment to{" "}
              <span className="font-semibold text-gray-800">
                premium quality
              </span>
              , cutting-edge design, and exceptional customer service makes us
              the preferred choice of thousands.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-xl shadow hover:shadow-md border border-gray-200 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                    {feature.icon}
                  </div>
                  <span className="text-gray-800 font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#C56029] to-[#F5B727] text-white font-semibold rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition duration-300">
                Explore Our Collection
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <div className="relative overflow-hidden rounded-3xl shadow-lg">
              <img
                src="/Upload/why.jpeg"
                alt="King Motors Luxury"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow">
                <p className="text-sm text-gray-800 font-medium">
                  Premium Quality Guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
