import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">GoodLand</h2>
            <p className="mt-3 text-gray-400">
              Building a better tomorrow with trust and care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/home" className="hover:text-emerald-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400">About</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400">Contact</Link></li>
              <li><Link to="/register" className="hover:text-emerald-400">Register</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { Icon: FaFacebookF, link: "https://facebook.com" },
                { Icon: FaTwitter, link: "https://twitter.com" },
                { Icon: FaInstagram, link: "https://instagram.com" },
                { Icon: FaLinkedinIn, link: "https://linkedin.com" },
              ].map(({ Icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-110 transition"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} GoodLand. Developed by{" "}
          <span className="font-semibold text-emerald-400">Marcus Mathuram</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
