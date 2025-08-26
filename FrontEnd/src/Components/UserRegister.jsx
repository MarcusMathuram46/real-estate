import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserRegister() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/user/register", registerData);
      setMsg("✅ Registration Successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 1000);
      setRegisterData({ name: "", email: "", password: "" });
    } catch (error) {
      setMsg("❌ " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleInputChange}
              placeholder="Enter your Name"
              autoComplete="name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleInputChange}
              placeholder="Enter your Email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>

          {/* Message */}
          {msg && (
            <p
              className={`text-center font-medium mt-3 ${
                msg.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
