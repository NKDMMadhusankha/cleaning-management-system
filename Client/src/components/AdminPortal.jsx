import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { API_BASE_URL } from '../config';

// Toast component
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-8 right-8 z-[9999] px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-300
    ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    role="alert"
  >
    <span className="font-semibold">{message}</span>
    <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

const AdminPortal = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  
  // Service management states
  const [services, setServices] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceForm, setServiceForm] = useState({ name: '', description: '' });
  const [serviceLoading, setServiceLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });
  // Show toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  // Fetch bookings from the server
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view this page');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/bookings`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          setError('You are not authorized to view this page. Please log in as an admin.');
          setLoading(false);
          return;
        }

        if (!response.ok) {
          let errorMsg = 'Failed to load bookings. Please try again later.';
          try {
            const errData = await response.json();
            errorMsg = errData.message || errorMsg;
          } catch {}
          setError(errorMsg);
          setLoading(false);
          return;
        }

        const data = await response.json();
        // Transform the data to match our table structure
        const transformedBookings = data.data.map(booking => ({
          id: booking._id,
          customerName: booking.customer_name,
          email: booking.user ? booking.user.email : 'Guest Booking',
          phone: booking.user ? booking.user.phone : 'N/A',
          date: new Date(booking.date_time).toLocaleDateString(),
          time: new Date(booking.date_time).toLocaleTimeString(),
          service: booking.service_type,
          status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
          price: '$150', // You might want to add price to your booking model
          address: booking.address
        }));

        setBookings(transformedBookings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/services/admin`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setServices(data.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus.toLowerCase() })
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      // Update local state after successful API call
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (error) {
      console.error('Error updating booking status:', error);
      showToast('Failed to update booking status. Please try again.', 'error');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        let errorMsg = 'Failed to delete booking';
        try {
          const errData = await response.json();
          errorMsg = errData.message || errorMsg;
        } catch {}
        console.error('Error deleting booking:', errorMsg);
        showToast(errorMsg, 'error');
        return;
      }

      // Remove from local state after successful deletion
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      setShowDeleteModal(false);
      setBookingToDelete(null);
      showToast('Booking deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting booking:', error);
      showToast('Failed to delete booking. Please try again.', 'error');
    }
  };

  const confirmDelete = (booking) => {
    setBookingToDelete(booking);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBookingToDelete(null);
  };

  // Service management functions
  const handleAddService = () => {
    setEditingService(null);
    setServiceForm({ name: '', description: '' });
    setShowServiceModal(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({ name: service.name, description: service.description || '' });
    setShowServiceModal(true);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    if (!serviceForm.name.trim()) {
      showToast('Service name is required', 'error');
      return;
    }

    setServiceLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = editingService 
        ? `${API_BASE_URL}/api/services/${editingService._id}`
        : `${API_BASE_URL}/api/services`;
      
      const method = editingService ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(serviceForm)
      });

      const data = await response.json();
      
      if (response.ok) {
        if (editingService) {
          setServices(services.map(s => s._id === editingService._id ? data.data : s));
          showToast('Service updated successfully', 'success');
        } else {
          setServices([...services, data.data]);
          showToast('Service added successfully', 'success');
        }
        setShowServiceModal(false);
        setServiceForm({ name: '', description: '' });
        setEditingService(null);
      } else {
        showToast(data.message || 'Failed to save service', 'error');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      showToast('Failed to save service. Please try again.', 'error');
    } finally {
      setServiceLoading(false);
    }
  };

  // Service delete modal state
  const [showServiceDeleteModal, setShowServiceDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const confirmDeleteService = (service) => {
    setServiceToDelete(service);
    setShowServiceDeleteModal(true);
  };

  const cancelDeleteService = () => {
    setShowServiceDeleteModal(false);
    setServiceToDelete(null);
  };

  const handleDeleteService = async () => {
    if (!serviceToDelete) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/services/${serviceToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setServices(services.filter(s => s._id !== serviceToDelete._id));
        showToast('Service removed successfully', 'success');
      } else {
        let errorMsg = 'Failed to remove service';
        try {
          const errData = await response.json();
          errorMsg = errData.message || errorMsg;
        } catch {}
        showToast(errorMsg, 'error');
      }
    } catch (error) {
      console.error('Error removing service:', error);
      showToast('Failed to remove service. Please try again.', 'error');
    } finally {
      setShowServiceDeleteModal(false);
      setServiceToDelete(null);
    }
  };

  const closeServiceModal = () => {
    setShowServiceModal(false);
    setServiceForm({ name: '', description: '' });
    setEditingService(null);
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
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8cc53f]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-xl font-semibold">{error}</p>
          </div>
        ) : (
          <div>
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
                className="px-4 py-2 pr-8 rounded-full border border-gray-200 focus:outline-none focus:border-[#8cc53f] appearance-none bg-no-repeat bg-right"
                style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')", backgroundPosition: "right 20px center", backgroundSize: "12px" }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={handleAddService}
                className="px-6 py-2 bg-[#8cc53f] text-white rounded-full font-semibold hover:bg-[#7ab534] transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Services</span>
              </button>
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
                          className="px-3 py-1 pr-6 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#8cc53f] appearance-none bg-no-repeat bg-right"
                          style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')", backgroundPosition: "right 8px center", backgroundSize: "10px" }}
                          value={booking.status}
                          onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                        >
                          <option value="Confirmed">Confirm</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Complete</option>
                          <option value="Cancelled">Cancel</option>
                        </select>
                        <button
                          onClick={() => confirmDelete(booking)}
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
        )}
      </div>
      </div>

      {/* Service Management Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingService ? 'Edit Service' : 'Manage Services'}
              </h3>
              <button
                onClick={closeServiceModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Add/Edit Service Form */}
            <div className="mb-8 bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h4>
              <form onSubmit={handleServiceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8cc53f]"
                    placeholder="Enter service name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8cc53f]"
                    placeholder="Enter service description (optional)"
                    rows="3"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={serviceLoading}
                    className="px-6 py-2 bg-[#8cc53f] text-white rounded-lg font-semibold hover:bg-[#7ab534] transition-colors disabled:opacity-50"
                  >
                    {serviceLoading ? 'Saving...' : (editingService ? 'Update Service' : 'Add Service')}
                  </button>
                  {editingService && (
                    <button
                      type="button"
                      onClick={closeServiceModal}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Services List */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Current Services</h4>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Service Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {services.filter(service => service.isActive).map(service => (
                        <tr key={service._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">{service.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-gray-600">{service.description || 'No description'}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditService(service)}
                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => confirmDeleteService(service)}
                                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                              >
                                Remove
                              </button>
      {/* Service Delete Confirmation Modal */}
      {showServiceDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 border border-black">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Delete Service</h3>
              <p className="text-gray-600 mb-2">Are you sure you want to delete this service?</p>
              {serviceToDelete && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-600"><span className="font-semibold">Service:</span> {serviceToDelete.name}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Description:</span> {serviceToDelete.description || 'No description'}</p>
                </div>
              )}
              <p className="text-sm text-red-600 mb-8">This action cannot be undone.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={cancelDeleteService}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteService}
                  className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {services.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No services found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              {/* Warning Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Delete Booking</h3>
              <p className="text-gray-600 mb-2">Are you sure you want to delete this booking?</p>
              
              {bookingToDelete && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-600"><span className="font-semibold">Customer:</span> {bookingToDelete.customerName}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Service:</span> {bookingToDelete.service}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Date:</span> {bookingToDelete.date}</p>
                </div>
              )}
              
              <p className="text-sm text-red-600 mb-8">This action cannot be undone.</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={cancelDelete}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteBooking(bookingToDelete.id)}
                  className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(t => ({ ...t, visible: false }))} />
      )}
    </>
  );
};

export default AdminPortal;