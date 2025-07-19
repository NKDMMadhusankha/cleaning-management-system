import React, { useState } from 'react';
import Navbar from './Navbar';

const AdminPortal = () => {
  // Example bookings data - replace with actual data from your backend
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      date: '2025-07-25',
      time: '09:00 AM',
      service: 'Deep Cleaning',
      status: 'Confirmed',
      price: '$150',
      address: '123 Main St, City, State 12345'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8901',
      date: '2025-07-26',
      time: '02:00 PM',
      service: 'Regular Cleaning',
      status: 'Pending',
      price: '$80',
      address: '456 Oak Ave, City, State 12345'
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      email: 'mike.j@example.com',
      phone: '+1 234 567 8902',
      date: '2025-07-24',
      time: '11:00 AM',
      service: 'Deep Cleaning',
      status: 'Completed',
      price: '$150',
      address: '789 Pine St, City, State 12345'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdateStatus = (bookingId, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    // Add API call to update status
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      // Add API call to delete booking
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#202020]">Admin Portal</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="w-64 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#8cc53f]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select
                className="px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#8cc53f]"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Summary Cards at Top */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-[#202020]">
              <h3 className="text-lg font-semibold text-gray-600 mb-3">Total Bookings</h3>
              <p className="text-4xl font-bold text-[#202020]">{bookings.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-600">
              <h3 className="text-lg font-semibold text-gray-600 mb-3">Pending</h3>
              <p className="text-4xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === 'Pending').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-600">
              <h3 className="text-lg font-semibold text-gray-600 mb-3">Confirmed</h3>
              <p className="text-4xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'Confirmed').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-600">
              <h3 className="text-lg font-semibold text-gray-600 mb-3">Completed</h3>
              <p className="text-4xl font-bold text-blue-600">
                {bookings.filter(b => b.status === 'Completed').length}
              </p>
            </div>
          </div>


        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#e8f9d9]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#202020]">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#202020]">Service Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#202020]">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#202020]">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#202020]">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#202020]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="font-semibold text-[#202020]">{booking.customerName}</p>
                        <p className="text-sm text-gray-500">{booking.email}</p>
                        <p className="text-sm text-gray-500">{booking.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="font-semibold text-[#202020]">{booking.service}</p>
                        <p className="text-sm text-gray-500">{booking.address}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="font-semibold text-[#202020]">{booking.date}</p>
                        <p className="text-sm text-gray-500">{booking.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#202020]">{booking.price}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#8cc53f]"
                          value={booking.status}
                          onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                        >
                          <option value="Confirmed">Confirm</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Complete</option>
                          <option value="Cancelled">Cancel</option>
                        </select>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBookings.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No bookings found
            </div>
          )}
        </div>


      </div>
      </div>
    </>
  );
};

export default AdminPortal;