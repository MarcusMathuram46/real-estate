import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Package,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";  // ✅ import navigate

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();  // ✅ hook for redirect

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { title: "Users", icon: <Users size={20} />, path: "/admin/users" },
    { title: "Services", icon: <Users size={20} />, path: "/admin/services" },
    { title: "Documents", icon: <Users size={20} />, path: "/admin/documents" },
    { title: "Request", icon: <Users size={20} />, path: "/admin/requests" },
    { title: "Add Services", icon: <Users size={20} />, path: "/admin/add-services" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // ✅ clear token
    navigate("/login"); // ✅ redirect to login
  };

  return (
    <motion.div
      animate={{ width: isOpen ? "16rem" : "5rem" }}
      className="h-screen bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#0f172a] text-white shadow-2xl flex flex-col relative"
      transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-4 top-6 bg-blue-600 p-1 rounded-full shadow-md hover:bg-blue-700 transition"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-blue-700">
        {isOpen ? (
          <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
        ) : (
          <h1 className="text-xl font-bold">A</h1>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)} // ✅ navigation
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer"
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
      <div className="border-t border-blue-700 px-4 py-4">
        <button
          onClick={handleLogout}  // ✅ logout action
          className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}

export default AdminSidebar;
