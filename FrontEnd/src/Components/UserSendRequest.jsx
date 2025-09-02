import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const services = [
  { id: 1, title: "Patta Transfer & Change", desc: "Assistance with ownership records and revenue department updates." },
  { id: 2, title: "Legal Documentation", desc: "Drafting and verification of sale deeds, agreements, and other legal documents." },
  { id: 3, title: "Property Disputes & Legal Issues", desc: "Expert guidance and liaison with legal professionals to resolve disputes quickly." },
  { id: 4, title: "Due Diligence & Verification", desc: "Comprehensive checks on property ownership, encumbrances, and title clearance." },
  { id: 5, title: "Guidance for Buyers & Sellers", desc: "Advisory services to help customers make informed decisions in real estate transactions." },
];

function UserSendRequest() {
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await axios.post("/api/requests", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Request sent successfully!");
      setFormData({ service: "", name: "", email: "", phone: "", message: "", file: null });
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-6 max-w-2xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-center text-blue-700 mb-6"
      >
        Send Service Request
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.select
          whileFocus={{ scale: 1.02 }}
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        >
          <option value="">Select a Service</option>
          {services.map((s) => (
            <option key={s.id} value={s.title}>{s.title}</option>
          ))}
        </motion.select>

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />

        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          name="message"
          placeholder="Additional Details"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />

        <motion.input
          whileHover={{ scale: 1.01 }}
          type="file"
          name="file"
          onChange={handleChange}
          className="w-full cursor-pointer"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          🚀 Submit Request
        </motion.button>
      </form>
    </motion.div>
  );
}

export default UserSendRequest;
