import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const [user, setUser] = useState(null);
  
  // Fetch user and booking data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch user details
        const userResponse = await fetch(`${API_BASE_URL}/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          console.error('User fetch failed:', userResponse.status, errorText);
          throw new Error(`Failed to fetch user data: ${userResponse.status} ${errorText}`);
        }

        const userData = await userResponse.json();
        setUser(userData.data);

        // Fetch bookings
        const bookingsResponse = await fetch(`${API_BASE_URL}/api/bookings/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!bookingsResponse.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const bookingsData = await bookingsResponse.json();
        
        // Separate upcoming and previous bookings
        const currentDate = new Date();
        const upcoming = [];
        const previous = [];

        bookingsData.data.forEach(booking => {
          const bookingDate = new Date(booking.date_time);
          const formattedBooking = {
            id: booking._id,
            date: bookingDate.toLocaleDateString(),
            time: bookingDate.toLocaleTimeString(),
            service: booking.service_type,
            status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
            price: '$150', // You might want to add this to your booking model
            rating: booking.rating || 0
          };

          if (booking.status === 'completed' || booking.status === 'cancelled') {
            previous.push(formattedBooking);
          } else if (bookingDate > currentDate || booking.status === 'pending' || booking.status === 'confirmed') {
            upcoming.push(formattedBooking);
          } else {
            previous.push(formattedBooking);
          }
        });

        setUpcomingBookings(upcoming);
        setPreviousBookings(previous);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load profile data');
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Only use real booking data from backend
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);

  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setUser(data.data);
      setEditMode(false);
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Failed to update profile. Please try again.', 'error');
    }
  };

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const openCancelModal = (booking) => {
    setBookingToCancel(booking);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setBookingToCancel(null);
  };

  const handleDeleteBooking = async () => {
    if (!bookingToCancel) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/bookings/user/${bookingToCancel.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }
      showToast('Booking deleted successfully!', 'success');
      closeCancelModal();
      window.location.reload();
    } catch (error) {
      showToast('Failed to delete booking. Please try again.', 'error');
      closeCancelModal();
    }
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bookingToUpdate, setBookingToUpdate] = useState(null);
  const serviceOptions = [
    'Deep Cleaning',
    'Carpet Cleaning',
    'Window Cleaning',
    'Office Cleaning',
    'Home Cleaning',
  ];
  const [updateForm, setUpdateForm] = useState({
    customer_name: '',
    address: '',
    date_time: '',
    service_type: '',
  });

  const openUpdateModal = (booking) => {
    setBookingToUpdate(booking);
    setUpdateForm({
      customer_name: booking.customer_name || '',
      address: booking.address || '',
      date_time: booking.date_time || '',
      service_type: booking.service_type || '',
    });
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setBookingToUpdate(null);
  };

  const handleUpdateFormChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const submitUpdateBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateForm)
      });
      if (!response.ok) {
        throw new Error('Failed to update booking');
      }
      closeUpdateModal();
      window.location.reload();
    } catch (error) {
      alert('Failed to update booking. Please try again.');
    }
  };

  return (
    <>
      {toast.show && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all duration-300 ${toast.type === 'success' ? 'bg-[#8cc53f]' : 'bg-red-500'}`}
        >
          {toast.message}
        </div>
      )}
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
          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8cc53f]"></div>
            </div>
          )}
          {/* Error Message */}
          {error && (
            <div className="text-center text-red-500 font-semibold py-8">
              {error}
            </div>
          )}
          {/* Main Profile UI */}
          {!loading && !error && user && (
            <>
              {/* User Profile Section */}
              <div className={`bg-white rounded-2xl shadow-md p-6 mb-8 transition-all duration-700 hover:shadow-lg ${isVisible ? 'animate-fadeInUp delay-100' : 'initial-hidden'}`}>
                <h2 className={`text-3xl font-bold text-[#202020] mb-6 ${isVisible ? 'animate-slideInLeft delay-200' : 'initial-hidden'}`}>My Profile</h2>
                <div className={`grid md:grid-cols-3 gap-6 ${isVisible ? 'animate-fadeInUp delay-300' : 'initial-hidden'}`}>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Full Name</label>
                    {editMode ? (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={user?.firstName || ''}
                          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                          placeholder="First Name"
                          className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8cc53f]"
                        />
                        <input
                          type="text"
                          value={user?.lastName || ''}
                          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                          placeholder="Last Name"
                          className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8cc53f]"
                        />
                      </div>
                    ) : (
                      <p className="text-lg font-semibold text-[#202020]">{user?.firstName} {user?.lastName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Email</label>
                    {editMode ? (
                      <input
                        type="email"
                        value={user?.email || ''}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8cc53f]"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-[#202020]">{user?.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Phone</label>
                    {editMode ? (
                      <input
                        type="tel"
                        value={user?.phone || ''}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8cc53f]"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-[#202020]">{user?.phone}</p>
                    )}
                  </div>
                </div>
                {editMode ? (
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={handleSaveProfile}
                      className={`px-6 py-2 bg-[#8cc53f] text-white rounded-full hover:bg-[#7ab534] transition-all duration-300 hover:scale-105 hover:shadow-lg ${isVisible ? 'animate-fadeInUp delay-400' : 'initial-hidden'}`}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className={`px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-lg ${isVisible ? 'animate-fadeInUp delay-400' : 'initial-hidden'}`}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { if (user) setEditMode(true); }}
                    disabled={!user}
                    className={`mt-6 px-6 py-2 bg-[#8cc53f] text-white rounded-full hover:bg-[#7ab534] transition-all duration-300 hover:scale-105 hover:shadow-lg ${isVisible ? 'animate-fadeInUp delay-400' : 'initial-hidden'} ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Edit Profile
                  </button>
                )}
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
                            onClick={() => openUpdateModal(booking)}
                            className="px-4 py-2 bg-[#8cc53f] text-white rounded-full hover:bg-[#7ab534] transition-all duration-300 hover:scale-105 hover:shadow-md"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => openCancelModal(booking)}
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
                      <div className="grid md:grid-cols-5 gap-4 items-center">
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
                      </div>
                    </div>
                  ))}
                  {previousBookings.length === 0 && (
                    <p className={`text-gray-500 text-center py-4 ${isVisible ? 'animate-fadeIn delay-900' : 'initial-hidden'}`}>No previous bookings</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Update Booking Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Update Booking</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="customer_name"
                value={updateForm.customer_name}
                onChange={handleUpdateFormChange}
                placeholder="Customer Name"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="address"
                value={updateForm.address}
                onChange={handleUpdateFormChange}
                placeholder="Address"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="datetime-local"
                name="date_time"
                value={updateForm.date_time}
                onChange={handleUpdateFormChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <select
                name="service_type"
                value={updateForm.service_type}
                onChange={handleUpdateFormChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select a service</option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeUpdateModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={submitUpdateBooking}
                className="px-4 py-2 bg-[#8cc53f] text-white rounded-full hover:bg-[#7ab534]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-red-600">Cancel Booking</h3>
            <p className="mb-6 text-gray-700">Are you sure you want to cancel this booking?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeCancelModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500"
              >
                No, Keep
              </button>
              <button
                onClick={handleDeleteBooking}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;