import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [serviceOptions, setServiceOptions] = useState([]);
  const [form, setForm] = useState({
    customer_name: '',
    address: '',
    date_time: '',
    service_type: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // Fetch services from the database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { API_BASE_URL } = require('../config');
        const response = await fetch(`${API_BASE_URL}/api/services`);
        if (response.ok) {
          const data = await response.json();
          setServiceOptions(data.data.map(service => service.name));
        } else {
          // Fallback to default services if API fails
          setServiceOptions([
            'Deep Cleaning',
            'Carpet Cleaning',
            'Window Cleaning',
            'Office Cleaning',
            'Home Cleaning',
          ]);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to default services if API fails
        setServiceOptions([
          'Deep Cleaning',
          'Carpet Cleaning',
          'Window Cleaning',
          'Office Cleaning',
          'Home Cleaning',
        ]);
      }
    };

    fetchServices();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.customer_name) newErrors.customer_name = 'Customer name is required.';
    if (!form.address) newErrors.address = 'Address is required.';
    if (!form.date_time) newErrors.date_time = 'Date and time are required.';
    if (!form.service_type) newErrors.service_type = 'Service type is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { API_BASE_URL } = require('../config');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const token = localStorage.getItem('token');
        
        // Check if user is logged in
        if (!token) {
          setShowLoginAlert(true);
          setTimeout(() => {
            setShowLoginAlert(false);
            navigate('/login');
          }, 3000);
          return;
        }
        
        const response = await fetch(`${API_BASE_URL}/api/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(form)
        });

        const data = await response.json();

        if (data.success) {
          if (onSubmit) onSubmit(form);
          setIsSubmitted(true);
          // Reset form after 3 seconds
          setTimeout(() => {
            setForm({
              customer_name: '',
              address: '',
              date_time: '',
              service_type: '',
            });
            setIsSubmitted(false);
          }, 3000);
        } else {
          // Handle validation errors from server
          const serverErrors = {};
          if (data.errors) {
            data.errors.forEach(error => {
              if (error.includes('Customer name')) serverErrors.customer_name = error;
              if (error.includes('Address')) serverErrors.address = error;
              if (error.includes('Date and time')) serverErrors.date_time = error;
              if (error.includes('Service type')) serverErrors.service_type = error;
            });
            setErrors(serverErrors);
          }
        }
      } catch (error) {
        console.error('Error submitting booking:', error);
        // Show error message to user
        setErrors({
          submit: 'Failed to submit booking. Please try again.'
        });
      }
    }
  };

  return (
    <section id="booking" className="relative bg-gray-50 mt-20 mb-20 py-8 px-4 overflow-hidden">
      {/* Modern Login Alert */}
      {showLoginAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl transform animate-slide-up">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-4 animate-pulse-red-glow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h3>
              <p className="text-gray-600 mb-6">Please login to book a cleaning service!</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Redirecting to login page...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background Elements and Floating Particles removed as requested */}

      <div className="relative max-w-6xl mx-auto">
        {isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Title and Icon (same as form view) */}
            <div className="text-left animate-slide-down">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#8cc53f] to-green-600 rounded-full mb-4 shadow-2xl animate-pulse-glow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#8cc53f] via-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 leading-tight">
                Book Your Cleaning Service
              </h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                Experience professional cleaning with our expert team. We provide top-quality service with attention to every detail.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-[#8cc53f] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional and trained staff
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-[#8cc53f] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Eco-friendly cleaning products
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-[#8cc53f] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  100% satisfaction guarantee
                </div>
              </div>
            </div>
            
            {/* Right Side - Confirmation Message */}
            <div className="animate-slide-up delay-200">
              <div className="bg-white/90 backdrop-blur-2xl rounded-3xl border border-green-100 p-6 transition-all duration-700 hover:bg-white/95 min-h-[600px] flex items-center justify-center">
                <div className="text-center animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-[#8cc53f] rounded-full mb-4 animate-bounce shadow-2xl">
                    <svg className="w-8 h-8 text-white animate-check-mark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[#8cc53f] mb-2 animate-slide-up">Booking Submitted!</h3>
                  <p className="text-gray-600 animate-slide-up delay-200">Thank you! We'll contact you within 24 hours to confirm your booking.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Title and Icon */}
            <div className="text-left animate-slide-down">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#8cc53f] to-green-600 rounded-full mb-4 shadow-2xl animate-pulse-glow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#8cc53f] via-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 leading-tight">
                Book Your Cleaning Service
              </h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                Experience professional cleaning with our expert team. We provide top-quality service with attention to every detail.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-[#8cc53f] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional and trained staff
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-[#8cc53f] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Eco-friendly cleaning products
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-[#8cc53f] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  100% satisfaction guarantee
                </div>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="animate-slide-up delay-200">
              <form className="bg-white/90 backdrop-blur-2xl rounded-3xl border border-green-100 p-6 transition-all duration-700 hover:bg-white/95" onSubmit={handleSubmit}>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Booking Details</h3>
                  <p className="text-gray-600 text-sm">Fill in your information to schedule your service</p>
                </div>

                {/* Form Grid - 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Customer Name */}
                  <div className="group animate-slide-up delay-100">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-[#8cc53f] transition-colors duration-300">
                      Customer Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="customer_name"
                        value={form.customer_name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('customer_name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#8cc53f] focus:bg-green-50/50 transition-all duration-500 outline-none text-gray-800 placeholder-gray-400 shadow-lg"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.customer_name && (
                      <p className="text-red-500 text-sm mt-2 flex items-center animate-shake">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.customer_name}
                      </p>
                    )}
                  </div>

                  {/* Service Type */}
                  <div className="group animate-slide-up delay-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-[#8cc53f] transition-colors duration-300">
                      Service Type
                    </label>
                    <div className="relative">
                      <select
                        name="service_type"
                        value={form.service_type}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('service_type')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#8cc53f] focus:bg-green-50/50 transition-all duration-500 outline-none text-gray-800 appearance-none cursor-pointer shadow-lg"
                      >
                        <option value="" className="bg-white text-gray-800">Select a service</option>
                        {serviceOptions.map((service) => (
                          <option key={service} value={service} className="bg-white text-gray-800">{service}</option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.service_type && (
                      <p className="text-red-500 text-sm mt-2 flex items-center animate-shake">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.service_type}
                      </p>
                    )}
                  </div>

                  {/* Address - Full Width */}
                  <div className="md:col-span-2 group animate-slide-up delay-300">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-[#8cc53f] transition-colors duration-300">
                      Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('address')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#8cc53f] focus:bg-green-50/50 transition-all duration-500 outline-none text-gray-800 placeholder-gray-400 shadow-lg"
                        placeholder="Enter your complete address"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-2 flex items-center animate-shake">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Date and Time - Full Width */}
                  <div className="md:col-span-2 group animate-slide-up delay-400">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-[#8cc53f] transition-colors duration-300">
                      Date and Time
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        name="date_time"
                        value={form.date_time}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('date_time')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#8cc53f] focus:bg-green-50/50 transition-all duration-500 outline-none text-gray-800 shadow-lg appearance-none [-webkit-appearance:none] [&::-webkit-datetime-edit]:px-0 [&::-webkit-datetime-edit-fields-wrapper]:px-0 [&::-webkit-datetime-edit-text]:px-1 [&::-webkit-datetime-edit-text]:text-gray-800 [&::-webkit-datetime-edit-month-field]:px-1 [&::-webkit-datetime-edit-day-field]:px-1 [&::-webkit-datetime-edit-year-field]:px-1 [&::-webkit-datetime-edit-hour-field]:px-1 [&::-webkit-datetime-edit-minute-field]:px-1 [&::-webkit-datetime-edit-ampm-field]:px-1"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'textfield'
                        }}
                      />
                    </div>
                    {errors.date_time && (
                      <p className="text-red-500 text-sm mt-2 flex items-center animate-shake">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.date_time}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center animate-slide-up delay-500">
                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-gradient-to-r from-[#8cc53f] via-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#8cc53f]/50 hover:scale-105 hover:shadow-3xl"
                  >
                    <span className="flex items-center justify-center">Book Your Service Now</span>
                  </button>

                  <p className="text-gray-500 text-xs mt-3 animate-pulse">
                    We'll confirm your booking within 24 hours ✨
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(140, 197, 63, 0.4); }
          50% { box-shadow: 0 0 40px rgba(140, 197, 63, 0.8); }
        }
        @keyframes pulse-red-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.8); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes check-mark {
          0% { stroke-dasharray: 0 50; }
          100% { stroke-dasharray: 50 0; }
        }
        
        .animate-float-0 { animation: float-0 6s ease-in-out infinite; }
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 7s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-pulse-red-glow { animation: pulse-red-glow 2s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-slide-down { animation: slide-down 0.6s ease-out forwards; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-check-mark { animation: check-mark 1s ease-in-out forwards; }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-1000 { animation-delay: 1s; }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
};

export default BookingForm;
