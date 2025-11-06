'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

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
                      {appointment.service?.title || 'N/A'}
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
                          onClick={() => toast.info(`Address: ${appointment.address}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDelete(appointment._id)}
                          className="text-red-600 hover:text-red-800"
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
    </div>
  );
}
