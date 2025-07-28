import React, { useState, useEffect, useRef } from "react";
import { Eye, Globe, Sparkles, TrendingUp } from "lucide-react";

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const statsRef = useRef(null);

  const visionStats = [
    {
      icon: <Eye className="w-6 h-6" />,
      label: "Vision Target",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Our ambitious timeline",
      targetValue: 2030,
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: "Global Markets",
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Worldwide presence",
      targetValue: 50,
      suffix: "+",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      label: "Innovation Rate",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Constant evolution",
      targetValue: 100,
      suffix: "%",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Growth YoY",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      description: "Exponential progress",
      targetValue: 25,
      suffix: "%",
    },
  ];

  // Animate numbers
  const animateNumber = (targetValue, index, duration = 2000) => {
    const startTime = Date.now();
    const startValue = 0;

    const updateNumber = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const currentValue = Math.floor(
        startValue + (targetValue - startValue) * easedProgress
      );

      setAnimatedNumbers((prev) => ({
        ...prev,
        [index]: currentValue,
      }));

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };

    requestAnimationFrame(updateNumber);
  };

  // Intersection Observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          visionStats.forEach((stat, index) => {
            setTimeout(() => {
              animateNumber(stat.targetValue, index);
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={statsRef} className="relative px-4 mb-6 md:px-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {visionStats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-500 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full ${stat.bgColor} ${stat.color}`}
            >
              {stat.icon}
            </div>

            {/* Number */}
            <div className="text-3xl font-extrabold text-gray-800 mb-1">
              {animatedNumbers[index] !== undefined
                ? `${animatedNumbers[index]}${stat.suffix || ""}`
                : "0"}
            </div>

            {/* Label */}
            <div className="text-sm font-medium text-gray-600 mb-1 uppercase tracking-wide">
              {stat.label}
            </div>

            {/* Description */}
            <p className="text-xs text-gray-400">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
