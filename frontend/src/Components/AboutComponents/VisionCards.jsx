import React, { useState } from "react";
import {
  Leaf,
  Crown,
  Zap,
  ArrowRight,
  Shield,
  Award,
  Users,
} from "lucide-react";

export default function VisionCards() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const visionCards = [
    {
      title: "Certified Reconditioning",
      subtitle: "Quality You Can Count On",
      description:
        "Every vehicle is carefully inspected and reconditioned to meet rigorous quality standards, ensuring long-term performance and reliability.",
      image: "/Upload/cer.jpg",
      icon: <Shield className="w-7 h-7" />,
      color: "from-blue-600 to-indigo-700",
      stats: "100+ Checks Done",
      badge: "Reconditioned",
    },
    {
      title: "Affordable & Trusted",
      subtitle: "Value-Driven Pricing",
      description:
        "Our pricing is transparent and competitive. Drive away with confidence knowing you've secured the best value for a quality-assured used car.",
      image: "/Upload/aff.jpg",
      icon: <Award className="w-7 h-7" />,
      color: "from-emerald-500 to-green-600",
      stats: "Best Price Guarantee",
      badge: "Affordable",
    },
    {
      title: "Customer-First Approach",
      subtitle: "Service Beyond Sales",
      description:
        "We’re committed to building relationships — not just selling cars. Enjoy personalized service and after-sales support built around your needs.",
      image: "/Upload/customner.jpg",
      icon: <Users className="w-7 h-7" />,
      color: "from-amber-500 to-orange-600",
      stats: "4.9★ Support Rating",
      badge: "Service First",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-10 px-4">
      {visionCards.map((card, index) => (
        <div
          key={index}
          className={`group relative rounded-3xl overflow-hidden shadow-lg transition-all duration-500 ease-out transform cursor-pointer ${
            hoveredCard === index
              ? "scale-105 shadow-2xl"
              : "hover:scale-[1.02] hover:shadow-xl"
          }`}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Background Image */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                hoveredCard === index ? "scale-110" : "scale-100"
              }`}
            />

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${
                hoveredCard === index ? "opacity-90" : "opacity-60"
              }`}
            />
          </div>

          {/* Content Container */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            {/* Badge - Always visible but animated */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${
                card.color
              } rounded-full text-xs font-bold mb-4 self-start transition-all duration-500 ${
                hoveredCard === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {card.icon}
              {card.badge}
            </div>

            {/* Title - Always visible */}
            <h3 className="text-2xl font-bold mb-2 transition-all duration-300">
              {card.title}
            </h3>

            {/* Subtitle - Show on hover */}
            <p
              className={`text-sm text-gray-200 mb-3 transition-all duration-500 ${
                hoveredCard === index
                  ? "opacity-100 translate-y-0 max-h-20"
                  : "opacity-0 translate-y-4 max-h-0 mb-0"
              }`}
            >
              {card.subtitle}
            </p>

            {/* Description - Show on hover */}
            <p
              className={`text-sm text-gray-300 mb-4 transition-all duration-500 delay-100 ${
                hoveredCard === index
                  ? "opacity-100 translate-y-0 max-h-32"
                  : "opacity-0 translate-y-6 max-h-0 mb-0"
              }`}
            >
              {card.description}
            </p>

            <button
              className={`w-full py-3 px-4 rounded-lg font-semibold text-sm bg-gradient-to-r ${
                card.color
              } transition-all duration-500 delay-300 flex items-center justify-center gap-2 backdrop-blur-sm ${
                hoveredCard === index
                  ? "opacity-100 translate-y-0 hover:opacity-90"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Explore Vision
              <ArrowRight
                className={`w-4 h-4 transition-transform duration-300 ${
                  hoveredCard === index ? "translate-x-1" : ""
                }`}
              />
            </button>
          </div>

          {/* Subtle shine effect on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ${
              hoveredCard === index ? "translate-x-full" : "-translate-x-full"
            }`}
            style={{
              transform:
                hoveredCard === index
                  ? "translateX(100%) skewX(-15deg)"
                  : "translateX(-100%) skewX(-15deg)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
