import React from "react";

/**
 * ========================================
 * Hero Section - AboutHero
 * ========================================
 * This is the main hero section for the About page.
 * - Features a full-screen background image with gradient overlay
 * - Displays a headline, subheading, and CTA button
 * - Responsive and styled with Tailwind CSS
 * ========================================
 */

export default function AboutHero() {
  return (
    <section className="relative  bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="/Upload/why.jpeg" alt="" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-content flex-col container mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-wide drop-shadow-2xl">
          Welcome to Kings Motor
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Driving excellence since day one. At Kings Motor, we bring together
          luxury, performance, and reliability—crafting an experience that goes
          beyond the road. Explore our legacy and future-forward vision.
        </p>
      </div>
    </section>
  );
}
