import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Kings Motor Company Pvt. Ltd
          </h2>
          <p className="text-gray-400">
            Luxury. Power. Style. Explore our range of premium cars built to
            redefine your driving experience.
          </p>
          <div className="flex mt-4 space-x-4">
            <a
              href="#"
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-red-500 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-red-500 transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className="hover:text-red-500 transition-colors duration-200"
              >
                Our Cars
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-red-500 transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Biratnagar-04, Morang, Nepal
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2" /> +977-985-2030175
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" /> kingsmotorcpl@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 py-4 border-t border-gray-800">
        &copy; {new Date().getFullYear()} Kings Motor. All rights reserved.
      </div>
    </footer>
  );
}
