import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setLoggedIn(true);
    else setLoggedIn(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); 
    setLoggedIn(false); 
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold">
            GoodLand
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-200">
              Contact
            </Link>

            {/* Show Login if not logged in, else Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2 bg-blue-500">
          <Link to="/" className="block hover:text-gray-200">
            Home
          </Link>
          <Link to="/about" className="block hover:text-gray-200">
            About
          </Link>
          <Link to="/contact" className="block hover:text-gray-200">
            Contact
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
