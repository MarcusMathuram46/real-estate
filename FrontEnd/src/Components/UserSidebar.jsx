import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  FileText,
  MessageSquare,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { title: "Dashboard", icon: <Home size={20} />, path: "/user/dashboard" },
    { title: "My Requests", icon: <FileText size={20} />, path: "/user/requests" },
    { title: "Send Request", icon: <MessageSquare size={20} />, path: "/user/send-request" },
    { title: "Documents", icon: <MessageSquare size={20} />, path: "/user/documents" },
    { title: "Profile", icon: <User size={20} />, path: "/user/profile" },
  ];

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // remove token
    localStorage.removeItem("role");      // remove role
    navigate("/user/login");              // redirect to login
  };

  return (
    <motion.div
      animate={{ width: isOpen ? "16rem" : "5rem" }}
      className="h-screen bg-gradient-to-b from-green-700 to-green-900 text-white shadow-2xl flex flex-col relative"
      transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-4 top-6 bg-green-600 p-1 rounded-full shadow-md hover:bg-green-700 transition"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-green-600">
        {isOpen ? (
          <h1 className="text-2xl font-bold tracking-wide">User Panel</h1>
        ) : (
          <h1 className="text-xl font-bold">U</h1>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)} // ✅ Navigate on click
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-700 transition cursor-pointer"
            >
              {item.icon}
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.title}
                </motion.span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="border-t border-green-700 px-4 py-4">
        <button
          onClick={handleLogout} // ✅ Added logout logic
          className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}

export default UserSidebar;
