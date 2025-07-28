import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "./Context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const admin = user?.role;

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock/unlock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActiveLink = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/cars", label: "Our Cars" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl w-15 font-bold tracking-wide text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            <img src="/Upload/logo.png" alt="Kings Motor Logo" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 px-3 rouned-md transition-all duration-300 group ${
                  isActiveLink(link.path)
                    ? "text-red-600  border-b-2 border-red-500"
                    : "text-gray-700 hover:text-red-600 "
                }`}
              >
                {link.label}
                {/* Hover underline effect */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform transition-transform duration-300 ${
                    isActiveLink(link.path)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            ))}
            {admin === "admin" && (
              <Link
                to="/logout"
                className="text-gray-700 hover:text-red-600 font-medium px-3 py-2 transition-all duration-300"
              >
                Logout
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-all duration-200 p-2 rounded-md relative z-60"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gray-50/70">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:text-red-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col py-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={toggleMenu}
              className={`px-6 py-4 transition-all duration-300 border-l-4 flex items-center gap-3 ${
                isActiveLink(link.path)
                  ? "text-red-600 bg-red-50 border-red-500 font-medium"
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50 border-transparent"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-lg">{link.label}</span>
            </Link>
          ))}
          {admin === "admin" && (
            <Link
              to="/logout"
              onClick={toggleMenu}
              className="px-6 py-4 text-left text-red-600 font-medium border-t border-gray-200 hover:bg-gray-100 transition-all duration-300"
            >
              Logout
            </Link>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/50 bg-gray-50/70">
          <div className="text-center text-gray-600 text-sm">
            <p className="font-medium text-gray-800 mb-1">Kings Motor</p>
            <p>Your trusted car dealer</p>
          </div>
        </div>
      </div>
    </>
  );
}
