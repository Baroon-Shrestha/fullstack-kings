import React, { useState, useEffect } from "react";

import Carousel from "../HelperComopnents/Carosuel";

// Sample testimonials data
const testimonials = [
  {
    clientName: "Sujan Maharjan",
    designation: "Civil Engineer",
    review:
      "I recently purchased a reconditioned Creta from Kings Motors and I’m honestly impressed. The car looked and felt brand new, and the entire process was smooth and transparent.",
    productImage: "Upload/test1.jpeg",
    rating: 5,
  },
  {
    clientName: "Anisha Shrestha",
    designation: "Interior Designer",
    review:
      "Kings Motors exceeded my expectations. I got a well-maintained Aqua with clean documents and no hidden charges. The staff was very supportive throughout the purchase.",
    productImage: "Upload/test2.jpeg",
    rating: 5,
  },
  {
    clientName: "Rabin Basnet",
    designation: "Freelance Photographer",
    review:
      "Couldn’t be happier with my decision. My secondhand car runs perfectly and looks great. Kings Motors truly knows how to deliver quality and trust.",
    productImage: "Upload/test3.jpeg",
    rating: 5,
  },
  {
    clientName: "Shristi Bhandari",
    designation: "Banking Professional",
    review:
      "Buying my first car felt intimidating, but Kings Motors made it stress-free. They patiently answered all my questions and helped me find a budget-friendly, reliable vehicle.",
    productImage: "Upload/test4.jpeg",
    rating: 5,
  },
  {
    clientName: "Pratik Shakya",
    designation: "Software Developer",
    review:
      "The detailing and condition of the car were top-notch. Kings Motors provided genuine service and timely updates. Highly satisfied with the overall experience!",
    productImage: "Upload/test5.jpeg",
    rating: 5,
  },
  {
    clientName: "Ritika Joshi",
    designation: "Small Business Owner",
    review:
      "I was looking for a family car and found the perfect fit here. Clean interiors, great mileage, and friendly staff. I’d definitely recommend Kings Motors to anyone buying secondhand cars.",
    productImage: "Upload/test6.jpeg",
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
