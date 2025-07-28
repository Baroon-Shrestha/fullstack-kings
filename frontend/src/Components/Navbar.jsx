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

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const isActiveLink = (path) => {
    // Handle home page separately
    if (path === "/") {
      return location.pathname === "/";
    }

    // For other paths, check exact match or if current path starts with the link path
    // but ensure we don't get false positives
    return (
      location.pathname === path ||
      (location.pathname.startsWith(path + "/") && path !== "/")
    );
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/cars", label: "Our Cars" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 shadow-md border-b border-gray-200/30">
        <div
          className="w-full"
          style={{
            background:
              "linear-gradient(to right, rgba(255,223,0,0.9), rgba(255,102,0,0.9), rgba(20,20,20,0.9))",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="container mx-auto px-4 py-1 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 w-20">
              <img
                src="/Upload/logo.png"
                alt="Kings Motor Logo"
                className="w-full object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 px-2 transition duration-300 group ${
                    isActiveLink(link.path)
                      ? "text-[#FFA366] border-b-2 border-[#FFA366]"
                      : "text-white hover:text-[#FFA366]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#FFA366] transform transition-transform duration-300 ${
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
                  className="text-white hover:text-[#FFA366] transition"
                >
                  Logout
                </Link>
              )}
            </nav>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white hover:text-[#FFA366] p-2"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Dimmed Background for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-yellow-500 via-orange-600 to-gray-900 text-white z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={toggleMenu}
            className="p-2 hover:text-[#FFA366] transition"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col py-4 text-base">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={toggleMenu}
              className={`px-6 py-3 border-l-4 transition duration-200 ${
                isActiveLink(link.path)
                  ? "bg-[#FFA366]/30 border-[#FFA366] text-white"
                  : "border-transparent hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {admin === "admin" && (
            <Link
              to="/logout"
              onClick={toggleMenu}
              className="px-6 py-4 border-t border-white/20 text-[#FFA366] hover:text-white"
            >
              Logout
            </Link>
          )}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20 text-center text-xs">
          <p className="font-bold text-white">Kings Motor</p>
          <p className="text-white/70">Driven by Passion & Trust</p>
        </div>
      </div>
    </>
  );
}
