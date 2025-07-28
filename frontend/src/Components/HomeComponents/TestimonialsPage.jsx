import React, { useState, useEffect } from "react";

import Carousel from "../HelperComopnents/Carosuel";

// Sample testimonials data
const testimonials = [
  {
    clientName: "Sujan Maharjan",
    designation: "CEO, CloudWave Tech",
    review:
      "The Creta I received from Kings Motors was in immaculate condition. Their service exceeded my expectations and the delivery was hassle-free.",
    productImage: "Upload/test1.jpeg",
    rating: 5,
  },
  {
    clientName: "Anisha Shrestha",
    designation: "Marketing Manager, Urban Youth",
    review:
      "I was amazed by the condition and pricing. The Aqua I purchased was exactly as promised. Highly recommended!",
    productImage: "Upload/test2.jpeg",
    rating: 5,
  },
  {
    clientName: "Rabin Basnet",
    designation: "Freelancer",
    review:
      "Reliable, fast, and clean paperwork. Definitely going back for my next upgrade.",
    productImage: "Upload/test3.jpeg",
    rating: 5,
  },
];

// Reusable Carousel Component

// Main TestimonialsPage Component
export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            What Our Clients Say
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-extralight">
            Real feedback from real customers who've experienced our exceptional
            service.
          </p>
        </div>

        {/* Carousel Section */}
        <Carousel
          testimonials={testimonials}
          autoPlayInterval={6000}
          showArrows={true}
          showDots={true}
        />
      </div>
    </div>
  );
}
