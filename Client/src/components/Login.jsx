import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await response.json();
      if (data.success) {
        setPopup({ type: 'success', message: 'Login successful!' });
        localStorage.setItem('token', data.data.token);
        setTimeout(() => {
          setPopup(null);
          if (data.data.user && data.data.user.role === 'admin') {
            navigate('/portal');
          } else {
            navigate('/profile');
          }
        }, 1500);
      } else {
        setPopup({ type: 'error', message: data.message || 'Login failed' });
        setTimeout(() => setPopup(null), 3000);
      }
    } catch (err) {
      setPopup({ type: 'error', message: 'Login failed' });
      setTimeout(() => setPopup(null), 3000);
    }
    setLoading(false);
  };

  return (
    <>
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
      `}</style>
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
        </div>
        <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-[#202020] mb-2">Welcome back!</h2>
          <p className="text-gray-600 mb-8">
            Simplify your life and enjoy a spotless home with <span className="font-semibold text-[#8cc53f]">CleanEase</span>. Log in to book, manage, or track your cleaning services.
          </p>
          <form className="space-y-5" onSubmit={handleLogin}>
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
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50"
              required
            />
            <div className="flex justify-between items-center text-sm">
              <span></span>
              <a href="#" className="text-[#8cc53f] hover:underline">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#8cc53f] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#7ab534] transition-all duration-300 hover:scale-105 shadow-md"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-8 text-center text-gray-600">
            Not a member? <Link to="/register" className="text-[#8cc53f] font-semibold hover:underline">Register now</Link>
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

export default Login;