import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setPopup({ type: 'error', message: 'Passwords do not match' });
      setTimeout(() => setPopup(null), 3000);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password
        })
      });
      const data = await response.json();
      if (data.success) {
        setPopup({ type: 'success', message: 'Successfully registered! Redirecting to login...' });
        setForm({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
        setTimeout(() => {
          setPopup(null);
          navigate('/login');
        }, 1500);
      } else {
        setPopup({ type: 'error', message: data.message || 'Registration failed' });
        setTimeout(() => setPopup(null), 3000);
      }
    } catch (err) {
      setPopup({ type: 'error', message: 'Registration failed' });
      setTimeout(() => setPopup(null), 3000);
    }
    setLoading(false);
  };

  return (
    <>
      {popup && (
        <div
          style={{
            position: 'fixed',
            top: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            background: popup.type === 'success' ? '#8cc53f' : '#ff4d4f',
            color: '#fff',
            padding: '16px 32px',
            borderRadius: '999px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            fontWeight: 600,
            fontSize: '1.1rem',
            letterSpacing: '0.02em',
            transition: 'all 0.3s',
            opacity: 0.95
          }}
        >
          {popup.message}
        </div>
      )}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.08); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.12); }
        }
        .animate-pulse-slower {
          animation: pulse-slower 10s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        .animate-float-slow {
          animation: float-slow 7s ease-in-out infinite;
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(14px); }
        }
        .animate-float-slower {
          animation: float-slower 11s ease-in-out infinite;
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.7; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.18) rotate(15deg); }
        }
        .animate-sparkle {
          animation: sparkle 2.8s ease-in-out infinite;
        }
        .animate-sparkle-delayed {
          animation: sparkle 3.6s 1.2s ease-in-out infinite;
        }
      `}</style>
      <div className="min-h-screen flex items-center justify-center relative bg-white overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10">
          {/* Top Left Green Blob */}
          <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#e8f9d9] rounded-full filter blur-2xl opacity-70 animate-pulse-slow"></div>
          {/* Bottom Right Green Blob */}
          <div className="absolute bottom-[-100px] right-[-100px] w-[260px] h-[260px] bg-[#8cc53f] rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
          {/* Center Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f6fef3] to-white opacity-90"></div>
          {/* Floating Circles */}
          <div className="absolute top-[20%] left-[60%] w-16 h-16 bg-[#8cc53f] opacity-20 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-[15%] right-[55%] w-10 h-10 bg-[#8cc53f] opacity-10 rounded-full animate-float-slower"></div>
          {/* Animated Sparkles */}
          <svg className="absolute top-[18%] left-[30%] w-8 h-8 animate-sparkle" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.09 8.26L19 9.27L14.5 13.14L15.82 19.02L12 15.77L8.18 19.02L9.5 13.14L5 9.27L10.91 8.26L12 2Z" fill="#8cc53f" fillOpacity="0.18"/>
          </svg>
          <svg className="absolute top-[60%] left-[20%] w-5 h-5 animate-sparkle-delayed" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.09 8.26L19 9.27L14.5 13.14L15.82 19.02L12 15.77L8.18 19.02L9.5 13.14L5 9.27L10.91 8.26L12 2Z" fill="#8cc53f" fillOpacity="0.13"/>
          </svg>
          <svg className="absolute top-[70%] left-[75%] w-6 h-6 animate-sparkle" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.09 8.26L19 9.27L14.5 13.14L15.82 19.02L12 15.77L8.18 19.02L9.5 13.14L5 9.27L10.91 8.26L12 2Z" fill="#8cc53f" fillOpacity="0.15"/>
          </svg>
          <svg className="absolute top-[40%] left-[80%] w-4 h-4 animate-sparkle-delayed" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.09 8.26L19 9.27L14.5 13.14L15.82 19.02L12 15.77L8.18 19.02L9.5 13.14L5 9.27L10.91 8.26L12 2Z" fill="#8cc53f" fillOpacity="0.10"/>
          </svg>
        </div>
        <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl">
          {/* Left: Register Form */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-[#202020] mb-2">Create your account</h2>
            <p className="text-gray-600 mb-8">
              Join <span className="font-semibold text-[#8cc53f]">CleanEase</span> and enjoy a spotless home with just a few clicks. Register to book, manage, or track your cleaning services.
            </p>
            <form className="space-y-5" onSubmit={handleRegister}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#8cc53f] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#7ab534] transition-all duration-300 hover:scale-105 shadow-md"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="mx-4 text-gray-400">or continue with</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="bg-black text-white rounded-full p-3 hover:scale-110 transition">G</button>
              <button className="bg-black text-white rounded-full p-3 hover:scale-110 transition"></button>
              <button className="bg-black text-white rounded-full p-3 hover:scale-110 transition">f</button>
            </div>
            <p className="mt-8 text-center text-gray-600">
              Already have an account? <Link to="/login" className="text-[#8cc53f] font-semibold hover:underline">Login</Link>
            </p>
          </div>
          {/* Right: Illustration */}
          <div className="hidden md:flex w-1/2 bg-[#f6fef3] flex-col items-center justify-center p-10">
            <img
              src={require('../Assets/Hero_Bg.png')}
              alt="Cleaning Service Illustration"
              className="w-64 h-64 object-contain mb-6"
            />
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="text-xl font-bold text-[#202020] mb-2">Book. Relax. Shine.</h3>
              <p className="text-gray-600 mb-2">Track your bookings, manage schedules, and enjoy a sparkling clean space with CleanEase.</p>
              <span className="inline-block bg-[#8cc53f] text-white px-4 py-1 rounded-full text-sm font-semibold">100% Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;