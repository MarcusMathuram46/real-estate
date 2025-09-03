import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="text-2xl font-extrabold tracking-wide">
            GoodLand
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="hover:text-emerald-400 text-lg transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-emerald-400 text-lg transition duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-emerald-400 text-lg transition duration-300"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="bg-emerald-500 px-5 py-2 rounded-xl shadow hover:bg-emerald-600 hover:scale-105 transition transform duration-300"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-2xl"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-4 space-y-4">
          <Link
            to="/"
            className="block text-lg hover:text-emerald-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-lg hover:text-emerald-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-lg hover:text-emerald-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="block bg-emerald-500 px-4 py-2 rounded-lg text-center shadow hover:bg-emerald-600 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
