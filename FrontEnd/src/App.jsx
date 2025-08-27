import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

// Auth pages
import UserLogin from "./Components/UserLogin";
import UserRegister from "./Components/UserRegister";
import Login from "./Components/Login"; // Generic login if you have
import AdminLogin from "./Components/AdminLogin";
import AdminRegister from "./Components/AdminRegister";

// Protected pages
import UserDashboard from "./Components/UserDashboard"; // ✅ create this page
import AdminDashboard from "./Components/AdminDashboard"; // ✅ create this page

// ✅ Protected Route component
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  if (!token) {
    // Not logged in
    return <Navigate to={allowedRole === "admin" ? "/admin/login" : "/user/login"} replace />;
  }

  if (role !== allowedRole) {
    // Wrong role → block access
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navbar always visible */}
        <Navbar />

        <div className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />

            {/* User Protected Routes */}
            <Route
              path="/user/home"
              element={
                <ProtectedRoute allowedRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all → redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Footer always visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
