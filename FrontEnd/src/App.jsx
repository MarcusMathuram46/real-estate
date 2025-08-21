import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

// ✅ Separate component to handle Navbar visibility
function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const hideNavbarOnRoutes = ["/", "/register"]; // Navbar hidden on login/register
  const isNavbarHidden = hideNavbarOnRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100">
      {!isNavbarHidden && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      {!isNavbarHidden && <Footer />} {/* ✅ Footer always visible except login/register */}
    </div>
  );
}

export default App;
