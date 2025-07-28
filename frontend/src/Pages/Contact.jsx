import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Phone,
  MapPin,
  Clock,
  Mail,
  Send,
  MessageCircle,
} from "lucide-react";

export default function Contact() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const slides = [
    {
      id: 1,
      image: "/Upload/test1.jpeg",
      subtitle: "Luxury, Power & Style in Every Ride",
      description:
        "Experience automotive excellence with our premium collection.",
    },
    {
      id: 2,
      image: "Upload/test2.jpeg",
      subtitle: "Time To Go #SWIFTING",
      description: "Discover the perfect blend of efficiency and style.",
    },
    {
      id: 3,
      image: "Upload/test3.jpeg",
      subtitle: "Redefining Comfort & Elegance",
      description:
        "Step into a world of sophistication with our luxury lineup.",
    },
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `Hello Kings Motor! What kind of motors are you looking for? 🚗\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const whatsappURL = `https://wa.me/9779864687572?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappURL, "_blank");
  };

  const currentSlideData = slides[currentSlide];

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      content: "+977 985-2030175",
      description: "Available 24/7 for your inquiries",
      action: { text: "Call Now", href: "tel:+9779864687572", color: "blue" },
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: "+977 985-2030175",
      description: "Quick responses guaranteed",
      action: {
        text: "Chat Now",
        href: "https://wa.me/9779864687572",
        color: "green",
      },
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Biratnagar-4, Morang, Nepal",
      description: "Come see our showroom",
      action: { text: "Get Directions", href: "#", color: "purple" },
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "9:00 AM - 7:00 PM",
      description: "Monday to Saturday",
      action: { text: "Schedule Visit", href: "#", color: "orange" },
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      {/* Enhanced Hero Carousel Section */}
      <section className="relative w-full h-[40rem] overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <img
                src={slide.image}
                alt={`Contact - ${slide.subtitle}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
            </div>
          ))}
        </div>

        {/* Animated particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100, 0],
                y: [0, Math.random() * 100, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="  rounded-3xl p-8 "
          >
            <motion.h1
              key={currentSlideData.subtitle}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text"
            >
              Connect With Kings Motor
            </motion.h1>
            <motion.p
              key={currentSlideData.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-4"
            >
              {currentSlideData.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-6">
              Get In Touch
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-xl leading-relaxed">
              Your journey to the perfect vehicle starts with a conversation.
              Our expert team is ready to assist you every step of the way.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-blue-200 hover:-translate-y-2"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${
                      info.action.color === "blue"
                        ? "from-blue-500 to-blue-600"
                        : info.action.color === "green"
                        ? "from-green-500 to-green-600"
                        : info.action.color === "purple"
                        ? "from-purple-500 to-purple-600"
                        : "from-orange-500 to-orange-600"
                    } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-slate-900 font-semibold mb-1">
                    {info.content}
                  </p>
                  <p className="text-slate-600 text-sm mb-4">
                    {info.description}
                  </p>
                  <a
                    href={info.action.href}
                    target={
                      info.action.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      info.action.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-300 ${
                      info.action.color === "blue"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : info.action.color === "green"
                        ? "bg-green-500 hover:bg-green-600"
                        : info.action.color === "purple"
                        ? "bg-purple-500 hover:bg-purple-600"
                        : "bg-orange-500 hover:bg-orange-600"
                    } hover:scale-105`}
                  >
                    {info.action.text}
                  </a>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Enhanced Contact Form */}
          <div className="w-full gap-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/50">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      Send Us a Message
                    </h3>
                    <p className="text-slate-600">
                      We'll get back to you within 24 hours
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-slate-700"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 hover:bg-white"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-slate-700"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 hover:bg-white"
                        placeholder="+977 98X-XXXXXXX"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 hover:bg-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-white/70 hover:bg-white"
                      placeholder="Tell us about your requirements, preferred models, budget, or any questions you have..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Send to WhatsApp</span>
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    By submitting this form, you agree to be contacted via
                    WhatsApp for automotive inquiries.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
