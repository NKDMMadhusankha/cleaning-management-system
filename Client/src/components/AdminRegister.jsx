import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
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
          password: form.password,
          role: 'admin'
        })
      });
      const data = await response.json();
      if (data.success) {
        setPopup({ type: 'success', message: 'Admin registered! Redirecting to login...' });
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10">
        <h2 className="text-3xl font-bold text-[#202020] mb-2">Admin Registration</h2>
        <form className="space-y-5" onSubmit={handleRegister}>
          <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50" required />
          <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50" required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50" required />
          <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50" required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8cc53f] text-[#202020] bg-gray-50" required />
          <button type="submit" className="w-full bg-[#8cc53f] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#7ab534] transition-all duration-300 hover:scale-105 shadow-md" disabled={loading}>
            {loading ? 'Registering...' : 'Register as Admin'}
          </button>
        </form>
        {popup && (
          <div style={{ marginTop: '24px', background: popup.type === 'success' ? '#8cc53f' : '#ff4d4f', color: '#fff', padding: '12px 24px', borderRadius: '999px', fontWeight: 600, fontSize: '1.1rem', textAlign: 'center', opacity: 0.95 }}>
            {popup.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRegister;
