import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [AdminLoginData, setAdminLoginData] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // ✅ for redirecting

  const handleInputChange = (e) => {
    setAdminLoginData({ ...AdminLoginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/login",
        AdminLoginData
      );
      const info = response.data;

      if (info.token) {
        localStorage.setItem("authToken", info.token);
        setMsg("✅ Login Successful");

        // redirect after login
        setTimeout(() => {
          navigate("/"); // ✅ go to Home.jsx
        }, 1000);
      } else {
        setMsg("❌ " + info.message);
      }
      setAdminLoginData({ email: "", password: "" });
    } catch (error) {
      setMsg("❌ " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={AdminLoginData.email}
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
              value={AdminLoginData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="mt-3 text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

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

export default AdminLogin;
