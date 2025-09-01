import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ✅ Layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// ✅ Lazy-loaded Pages (improves performance)
const Home = lazy(() => import("./Components/Home"));
const UserLogin = lazy(() => import("./Components/UserLogin"));
const UserRegister = lazy(() => import("./Components/UserRegister"));
const Login = lazy(() => import("./Components/Login"));
const AdminLogin = lazy(() => import("./Components/AdminLogin"));
const AdminRegister = lazy(() => import("./Components/AdminRegister"));
const UserDashboard = lazy(() => import("./Components/UserDashboard"));
const AdminDashboard = lazy(() => import("./Components/AdminDashboard"));
const AdminServices = lazy(() => import("./Components/AdminServices"));

// ✅ Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  if (!token) {
    // Redirect based on role
    return <Navigate to={allowedRole === "admin" ? "/admin/login" : "/user/login"} replace />;
  }

  if (role !== allowedRole) {
    // Wrong role → kick out
    return <Navigate to="/" replace />;
  }

  return children;
};

// ✅ Loading fallback for lazy imports
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 🌍 Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
          </Route>

          {/* 👤 User Routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRole="user">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>

          {/* 🛠️ Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            
          </Route>

          {/* 🚧 Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
