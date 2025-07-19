import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Example user data - replace with actual user data from your backend
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900'
  });

  // Example booking data - replace with actual booking data from your backend
  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      id: 1,
      date: '2025-07-25',
      time: '09:00 AM',
      service: 'Deep Cleaning',
      status: 'Confirmed',
      price: '$150'
    },
    {
      id: 2,
      date: '2025-08-02',
      time: '02:00 PM',
      service: 'Regular Cleaning',
      status: 'Pending',
      price: '$80'
    }
  ]);

  const [previousBookings, setPreviousBookings] = useState([
    {
      id: 3,
      date: '2025-07-10',
      time: '10:00 AM',
      service: 'Regular Cleaning',
      status: 'Completed',
      price: '$80',
      rating: 5
    },
    {
      id: 4,
      date: '2025-06-25',
      time: '01:00 PM',
      service: 'Deep Cleaning',
      status: 'Completed',
      price: '$150',
      rating: 4
    }
  ]);

  const handleCancelBooking = (bookingId) => {
    // Add confirmation dialog
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setUpcomingBookings(upcomingBookings.filter(booking => booking.id !== bookingId));
      // Add API call to cancel booking
    }
  };

  const handleUpdateBooking = (bookingId) => {
    // Add your booking update logic here
    console.log('Update booking:', bookingId);
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
        }
        
        .animate-pulse-gentle {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        
        .initial-hidden {
          opacity: 0;
        }
      `}</style>
      <Navbar />
      <div className={`min-h-screen bg-gray-50 py-8 transition-all duration-1000 ${isVisible ? 'animate-fadeIn' : 'initial-hidden'}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* User Profile Section */}
        <div className={`bg-white rounded-2xl shadow-md p-6 mb-8 transition-all duration-700 hover:shadow-lg ${isVisible ? 'animate-fadeInUp delay-100' : 'initial-hidden'}`}>
          <h2 className={`text-3xl font-bold text-[#202020] mb-6 ${isVisible ? 'animate-slideInLeft delay-200' : 'initial-hidden'}`}>My Profile</h2>
          <div className={`grid md:grid-cols-3 gap-6 ${isVisible ? 'animate-fadeInUp delay-300' : 'initial-hidden'}`}>
            <div className="space-y-2 hover:transform hover:scale-105 transition-transform duration-300">
              <label className="text-sm text-gray-500">Full Name</label>
              <p className="text-lg font-semibold text-[#202020]">{user.name}</p>
            </div>
            <div className="space-y-2 hover:transform hover:scale-105 transition-transform duration-300">
              <label className="text-sm text-gray-500">Email</label>
              <p className="text-lg font-semibold text-[#202020]">{user.email}</p>
            </div>
            <div className="space-y-2 hover:transform hover:scale-105 transition-transform duration-300">
              <label className="text-sm text-gray-500">Phone</label>
              <p className="text-lg font-semibold text-[#202020]">{user.phone}</p>
            </div>
          </div>
          <button className={`mt-6 px-6 py-2 bg-[#8cc53f] text-white rounded-full hover:bg-[#7ab534] transition-all duration-300 hover:scale-105 hover:shadow-lg ${isVisible ? 'animate-fadeInUp delay-400' : 'initial-hidden'}`}>
            Edit Profile
          </button>
        </div>

        {/* Upcoming Bookings Section */}
        <div className={`bg-white rounded-2xl shadow-md p-6 mb-8 transition-all duration-700 hover:shadow-lg ${isVisible ? 'animate-fadeInUp delay-500' : 'initial-hidden'}`}>
          <h2 className={`text-2xl font-bold text-[#202020] mb-6 ${isVisible ? 'animate-slideInLeft delay-600' : 'initial-hidden'}`}>Upcoming Bookings</h2>
          <div className="space-y-4">
            {upcomingBookings.map((booking, index) => (
              <div key={booking.id} className={`border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-500 hover:transform hover:scale-[1.02] ${isVisible ? `animate-fadeInUp delay-${700 + index * 100}` : 'initial-hidden'}`}>
                <div className="grid md:grid-cols-6 gap-4 items-center">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500">Date</label>
                    <p className="font-semibold">{booking.date}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500">Time</label>
                    <p className="font-semibold">{booking.time}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500">Service</label>
                    <p className="font-semibold">{booking.service}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500">Status</label>
                    <p className="font-semibold">
                      <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500">Price</label>
                    <p className="font-semibold">{booking.price}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateBooking(booking.id)}
                      className="px-4 py-2 bg-[#8cc53f] text-white rounded-full hover:bg-[#7ab534] transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {upcomingBookings.length === 0 && (
              <p className={`text-gray-500 text-center py-4 ${isVisible ? 'animate-fadeIn delay-700' : 'initial-hidden'}`}>No upcoming bookings</p>
            )}
          </div>
        </div>

        {/* Previous Bookings Section */}
        <div className={`bg-white rounded-2xl shadow-md p-6 transition-all duration-700 hover:shadow-lg ${isVisible ? 'animate-fadeInUp delay-500' : 'initial-hidden'}`}>
          <h2 className={`text-2xl font-bold text-[#202020] mb-6 ${isVisible ? 'animate-slideInLeft delay-600' : 'initial-hidden'}`}>Previous Bookings</h2>
          <div className="space-y-4">
            {previousBookings.map((booking, index) => (
              <div key={booking.id} className={`border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-500 hover:transform hover:scale-[1.02] ${isVisible ? `animate-fadeInUp delay-${900 + index * 100}` : 'initial-hidden'}`}>
                <div className="grid md:grid-cols-6 gap-4 items-center">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500">Date</label>
                    <p className="font-semibold">{booking.date}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500">Time</label>
                    <p className="font-semibold">{booking.time}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500">Service</label>
                    <p className="font-semibold">{booking.service}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500">Status</label>
                    <p className="font-semibold">
                      <span className="inline-block px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                        {booking.status}
                      </span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500">Price</label>
                    <p className="font-semibold">{booking.price}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500">Rating</label>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-5 h-5 ${index < booking.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {previousBookings.length === 0 && (
              <p className={`text-gray-500 text-center py-4 ${isVisible ? 'animate-fadeIn delay-900' : 'initial-hidden'}`}>No previous bookings</p>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Profile;