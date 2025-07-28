import React, { useState } from "react";
import {
  Eye,
  Lightbulb,
  Leaf,
  Crown,
  Zap,
  Globe,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Star,
  Shield,
  Award,
} from "lucide-react";
import VisionCards from "./VisionCards";
import Stats from "./Stats";

export default function KingsMotorsVision() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-gray-800 mb-6 tracking-tight leading-tight">
            OUR VISION
            <span className="block text-3xl md:text-5xl mt-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              BEYOND TOMORROW
            </span>
          </h2>

          <div className="flex justify-center mb-8">
            <div className="w-40 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full animate-pulse"></div>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed font-light">
            At{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 relative">
              Kings Motor
              <Star className="w-4 h-4 text-amber-400 absolute -top-1 -right-5" />
            </span>
            , we're crafting a future where{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500 font-semibold">
              technology meets sustainability
            </span>{" "}
            and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 font-semibold">
              luxury meets innovation
            </span>
            . Every drive is transformed into an unforgettable journey—
            redefining automotive excellence worldwide.
          </p>
        </div>

        {/* Enhanced Vision Statistics */}
        <VisionCards />
        <Stats />

        {/* Call to Action Section */}
        <div className="text-center mt-24">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Experience the Future?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Join us on this revolutionary journey towards automotive
              excellence.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto">
              <Lightbulb className="w-6 h-6" />
              Discover More
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
