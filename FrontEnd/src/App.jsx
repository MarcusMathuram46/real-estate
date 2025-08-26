import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import UserLogin from "./Components/UserLogin";  // ✅ Import Login
import UserRegister from "./Components/UserRegister"; // ✅ Import Register
import Login from "./Components/Login"; // ✅ Import UserLogin
import AdminLogin from "./Components/AdminLogin"; // ✅ Import AdminLogin


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navbar always visible */}
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />         {/* Home Page */}
            <Route path="/login" element={<Login />} /> {/* Login Page */}
            <Route path="/user/login" element={<UserLogin />} /> {/* UserLogin Page */}
            <Route path="/user/register" element={<UserRegister />} /> {/* UserRegister Page */}
            <Route path="/admin/login" element={<AdminLogin />} /> {/* AdminLogin Page */}

          </Routes>
        </div>
        {/* Footer always visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
