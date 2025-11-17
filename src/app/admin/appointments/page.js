'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaEye, FaTimes } from 'react-icons/fa';
import { services } from '@/data/services';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments');
      setAppointments(response.data.data);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/appointments/${id}`, { status: newStatus });
      toast.success('Status updated successfully');
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    
    try {
      await axios.delete(`/api/appointments/${id}`);
      toast.success('Appointment deleted');
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to delete appointment');
    }
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.title : serviceId;
  };

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(a => a.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-2">Manage all appointment bookings</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex space-x-4">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === status
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">No appointments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{appointment.name}</div>
                        <div className="text-sm text-gray-500">{appointment.city}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {getServiceName(appointment.service)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900">{new Date(appointment.date).toLocaleDateString()}</div>
                        <div className="text-gray-500">{appointment.timeSlot}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900">{appointment.phone}</div>
                        <div className="text-gray-500">{appointment.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={appointment.status}
                        onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(appointment)}
                          className="text-blue-600 hover:text-blue-800 text-lg"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDelete(appointment._id)}
                          className="text-red-600 hover:text-red-800 text-lg"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Appointment Details Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Appointment Details</h2>
                <p className="text-orange-100 text-sm mt-1">Booking ID: {selectedAppointment._id}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Client Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
                  👤 Client Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900 font-medium">{selectedAppointment.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedAppointment.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                    <p className="text-gray-900 font-medium">
                      <a href={`tel:${selectedAppointment.phone}`} className="text-orange-600 hover:underline">
                        {selectedAppointment.phone}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">City</label>
                    <p className="text-gray-900">{selectedAppointment.city}</p>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
                  🕉️ Service Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Service</label>
                    <p className="text-gray-900 font-medium">{getServiceName(selectedAppointment.service)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date</label>
                    <p className="text-gray-900 font-medium">
                      {new Date(selectedAppointment.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      <select
                        value={selectedAppointment.status}
                        onChange={(e) => {
                          handleStatusChange(selectedAppointment._id, e.target.value);
                          setSelectedAppointment({ ...selectedAppointment, status: e.target.value });
                        }}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          selectedAppointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          selectedAppointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          selectedAppointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
                  📍 Location
                </h3>
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Address</label>
                  <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">{selectedAppointment.address}</p>
                </div>
              </div>

              {/* Additional Information */}
              {selectedAppointment.message && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
                    💬 Special Requirements / Message
                  </h3>
                  <p className="text-gray-900 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-600">
                    {selectedAppointment.message}
                  </p>
                </div>
              )}

              {/* Booking Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-gray-500">Booked On</label>
                    <p className="text-gray-900 font-medium">
                      {new Date(selectedAppointment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-500">Last Updated</label>
                    <p className="text-gray-900 font-medium">
                      {new Date(selectedAppointment.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t p-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
              <a
                href={`tel:${selectedAppointment.phone}`}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Call Client
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
