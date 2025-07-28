import React from "react";
import { Lightbulb, ArrowRight, Star } from "lucide-react";
import VisionCards from "./VisionCards";
import Stats from "./Stats";
import { Link } from "react-router-dom";

export default function KingsMotorsVision() {
  return (
    <section className="relative py-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
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
        {/* Vision Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight leading-snug bg-gradient-to-r from-[#C56029] to-[#F5B727] bg-clip-text text-transparent">
            OUR VISION
            <span className="block mt-2 bg-gradient-to-r from-[#C56029] to-[#F5B727] bg-clip-text text-transparent">
              BEYOND TOMORROW
            </span>
          </h2>

          <div className="flex justify-center mb-4">
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#C56029] to-[#F5B727] rounded-full relative overflow-hidden">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full animate-pulse"></div> */}
            </div>
          </div>

          {/* Vision Paragraph */}
          <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
            At{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C56029] to-[#F5B727] relative">
              Kings Motor
              <Star className="w-4 h-4 text-amber-400 absolute -top-1 -right-5" />
            </span>
            , we're crafting a future where{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500 font-semibold">
              technology meets sustainability
            </span>{" "}
            and luxury meets innovation . Every drive is transformed into an
            unforgettable journey— redefining automotive excellence worldwide.
          </p>
        </div>

        {/* Cards and Stats */}
        <VisionCards />
        <Stats />

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-orange-100/10 to-yellow-100/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#C56029] to-[#F5B727] bg-clip-text text-transparent">
              Ready to Experience the Future?
            </h3>
            <p className="text-gray-600 mb-6 text-base">
              Join us on this revolutionary journey towards automotive
              excellence.
            </p>
            <Link to="/cars">
              <button className="bg-gradient-to-r from-[#C56029] to-[#F5B727] text-white px-6 py-3 rounded-xl font-semibold text-base hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
                <Lightbulb className="w-5 h-5" />
                Discover More Options
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
