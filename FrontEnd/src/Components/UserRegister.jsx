import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserRegister() {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  });
  const [msg, setMsg] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });

    if (name === 'email') {
      setValidateEmail(/^\S+@\S+\.\S+$/.test(value));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!registerData.name) return setMsg('❌ Name is required');
    if (!registerData.email || !validateEmail)
      return setMsg('❌ Please enter a valid Email ID');
    if (!registerData.password) return setMsg('❌ Password cannot be empty');
    if (registerData.password !== registerData.rePassword)
      return setMsg('❌ Passwords do not match');

    try {
      await axios.post('http://localhost:4000/api/user/register', {
        username: registerData.name,
        email: registerData.email,
        password: registerData.password,
        phone: registerData.phone,
        role: 'user',
      });

      setMsg('✅ Registration Successful! Redirecting to login...');
      setRegisterData({ name: '', email: '', password: '', rePassword: '' });

      setTimeout(() => navigate('/user/login'), 1500);
    } catch (error) {
      setMsg(
        '❌ ' +
          (error.response?.data?.message || 'Registration failed. Try again.'),
      );
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an User Account
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
            {!validateEmail && registerData.email && (
              <p className="text-red-600 text-sm mt-1">*Enter a valid Email</p>
            )}
          </div>
          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={registerData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              autoComplete="tel"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-lg">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                name="password"
                value={registerData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-2 rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="px-3 text-gray-600"
              >
                {isPasswordVisible ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Re-enter Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Re-enter Password
            </label>
            <div className="flex items-center border rounded-lg">
              <input
                type={isRePasswordVisible ? 'text' : 'password'}
                name="rePassword"
                value={registerData.rePassword}
                onChange={handleInputChange}
                placeholder="Re-enter password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-2 rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsRePasswordVisible(!isRePasswordVisible)}
                className="px-3 text-gray-600"
              >
                {isRePasswordVisible ? '🙈' : '👁️'}
              </button>
            </div>
            {registerData.rePassword &&
              registerData.password !== registerData.rePassword && (
                <p className="text-red-600 text-sm mt-1">
                  *Passwords do not match
                </p>
              )}
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
                msg.startsWith('✅') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {msg}
            </p>
          )}
        </form>

        {/* Already have account */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/user/login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;
