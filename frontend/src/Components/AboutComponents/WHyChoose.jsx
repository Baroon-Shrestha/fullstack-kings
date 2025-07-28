import React from "react";
import {
  CheckCircle,
  Zap,
  Award,
  Users,
  Star,
  Shield,
  Clock,
  Heart,
  TrendingUp,
  Target,
} from "lucide-react";

export default function WhyChooseKingsMotors() {
  const achievements = [
    {
      icon: <Star className="w-6 h-6" />,
      number: "4.9",
      label: "Customer Rating",
      color: "text-yellow-500",
      ring: "ring-yellow-100",
      shadow: "hover:shadow-yellow-200",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      number: "100%",
      label: "Quality Guarantee",
      color: "text-blue-500",
      ring: "ring-blue-100",
      shadow: "hover:shadow-blue-200",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      number: "15+",
      label: "Years Experience",
      color: "text-purple-500",
      ring: "ring-purple-100",
      shadow: "hover:shadow-purple-200",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      number: "99%",
      label: "Customer Satisfaction",
      color: "text-red-500",
      ring: "ring-red-100",
      shadow: "hover:shadow-red-200",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C56029] to-[#F5B727] text-white px-5 py-2 rounded-full text-sm font-bold mb-4 shadow">
            <Target className="w-4 h-4" />
            WHY KINGS MOTOR STANDS OUT
          </div>
          <h2 className="text-3xl md:text-5xl bg-gradient-to-r from-[#C56029] to-[#F5B727] text-transparent bg-clip-text font-extrabold text-gray-800">
            Excellence <span className="blck ">In Every Detail</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Redefining luxury and performance. From world-class vehicles to
            award-winning service.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achieve, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center transform transition-all duration-300 ${achieve.shadow} hover:scale-105`}
            >
              <div
                className={`mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 ring-4 ${achieve.ring} mb-4`}
              >
                <span className={achieve.color}>{achieve.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {achieve.number}
              </h3>
              <p className="text-gray-500 text-sm mt-1 uppercase font-semibold tracking-wide">
                {achieve.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
