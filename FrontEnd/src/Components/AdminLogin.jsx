import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from './BackButton';

function AdminLogin() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:4000/api/admin/login',
        loginData,
      );

      const info = response.data;

      if (info.token && info.role) {
        // ✅ Save token & role
        localStorage.setItem('authToken', info.token);
        localStorage.setItem('role', info.role);

        setMsg('✅ Login Successful');

        // ✅ Redirect based on role
        setTimeout(() => {
          if (info.role === 'admin') {
            navigate('/admin/dashboard');
          } else if (info.role === 'user') {
            navigate('/user/home');
          } else {
            navigate('/'); // fallback
          }
        }, 1000);
      } else {
        setMsg('❌ ' + (info.message || 'Login failed. Try again.'));
      }

      setLoginData({ email: '', password: '' });
    } catch (error) {
      setMsg('❌ ' + (error.response?.data?.message || error.message));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#0f172a]">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        {/* ✅ Back Button */}
        <div className="mb-4">
          <BackButton />
        </div>
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
              value={loginData.email}
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
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
              />
              <button
                type="button"
                aria-label={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {isPasswordVisible ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white transition duration-300 
  ${
    loading
      ? 'bg-[#93c5fd] cursor-not-allowed'
      : 'bg-[#2563eb] hover:bg-[#1d4ed8]'
  }
`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Register Link */}
          <p className="mt-3 text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              to="/admin/register"
              className="text-[#2563eb] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

          {/* Message */}
          {msg && (
            <p
              className={`text-center font-medium mt-3 ${
                msg.startsWith('✅') ? 'text-green-600' : 'text-red-600'
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
