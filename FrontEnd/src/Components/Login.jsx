import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserAlt, FaUserShield } from 'react-icons/fa';
import BackButton from './BackButton';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center space-y-8 w-[22rem]"
      >
        {/* ✅ Back Button */}
        <div className="mb-4">
          <BackButton />
        </div>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          Choose Login
        </motion.h1>

        {/* User Login Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/user/login')}
          className="w-full flex items-center justify-center space-x-3 py-3 px-6 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <FaUserAlt className="text-2xl animate-bounce" />
          <span>User Login</span>
        </motion.button>

        {/* Admin Login Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/admin/login')}
          className="w-full flex items-center justify-center space-x-3 py-3 px-6 text-lg font-semibold text-white bg-purple-600 rounded-xl shadow-lg hover:bg-purple-700 transition duration-300"
        >
          <FaUserShield className="text-2xl animate-spin-slow" />
          <span>Admin Login</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Login;
