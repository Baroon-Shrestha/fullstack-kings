import React from "react";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/Upload/why.jpeg"
            alt="About Kings Motor"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-gray-900/60 to-gray-900/90"></div>

        {/* Content with Animation */}
        <div className="relative z-10 flex items-center justify-center flex-col container mx-auto px-6 py-32 text-center">
          <motion.h1
            className="text-3xl md:text-7xl font-extrabold text-white mb-4 tracking-wide drop-shadow-xl"
            initial={{ opacity: 0, x: 60, y: -30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C56029] to-[#F5B727] font-extrabold">
              Kings Motor
            </span>
          </motion.h1>

          <motion.p
            className="text-base md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-extralight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          >
            Driving excellence from the start — where innovation meets trust,
            and every mile is a mark of commitment. Discover a legacy shaped by
            performance and refined by passion.
          </motion.p>
        </div>
      </section>

      {/* Paragraph Section Below Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-10 px-6 md:px-12 text-center my-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#C56029] to-[#F5B727]">
            Who We Are
          </h2>

          <p className="text-gray-800 text-xl leading-relaxed mb-6">
            <span className="text-transparent bg-clip-text font-semibold bg-[#C56029]">
              Kings Motor Company Pvt. Ltd
            </span>{" "}
            is more than just a car dealership — it’s a hub of precision,
            ethics, and trust. With our years of experience and dedication to
            excellence, we strive to exceed expectations at every touchpoint.
            Our clients don’t just buy a car; they experience a relationship
            built on reliability.
          </p>

          <p className="text-gray-800 text-xl leading-relaxed mb-6">
            From{" "}
            <span className="font-medium">high-end reconditioned vehicles</span>{" "}
            to dependable urban models, our carefully selected inventory
            reflects a harmony of performance and peace of mind. Every vehicle
            undergoes rigorous inspection to uphold our signature quality
            standard.
          </p>

          <p className="text-gray-800 text-xl leading-relaxed">
            Whether you’re a{" "}
            <span className="text-black font-medium">first-time buyer</span> or
            a returning enthusiast, we welcome you to explore{" "}
            <span className="">Kings Motor</span> — where professionalism meets
            purpose, and your journey truly begins.
          </p>
        </div>
      </section>
    </>
  );
}
