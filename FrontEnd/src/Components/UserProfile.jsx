import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User, Mail, Phone, Home, MapPin, Edit, LogOut } from "lucide-react";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // ✅ auth token
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Profile Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6"
        whileHover={{ scale: 1.01 }}
      >
        {/* Avatar */}
        <motion.div
          className="w-28 h-28 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          {user.name?.charAt(0).toUpperCase()}
        </motion.div>

        {/* Basic Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2">
            <User className="w-7 h-7" /> {user.name}
          </h2>
          <p className="text-blue-100 flex items-center justify-center md:justify-start gap-2 mt-2">
            <Mail className="w-5 h-5" /> {user.email}
          </p>
          <p className="text-blue-100 flex items-center justify-center md:justify-start gap-2 mt-1">
            <Phone className="w-5 h-5" /> {user.phone || "N/A"}
          </p>
        </div>
      </motion.div>

      {/* Detailed Info */}
      <motion.div
        className="bg-white mt-6 rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 text-gray-700">
          <Home className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Role: </span> {user.role}
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Address: </span> {user.address || "No address provided"}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="flex justify-center gap-4 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button className="px-6 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
          <Edit className="w-5 h-5" /> Edit Profile
        </button>
        <button className="px-6 py-2 flex items-center gap-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </motion.div>
    </motion.div>
  );
}

export default UserProfile;
