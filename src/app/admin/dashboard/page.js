'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaHourglassHalf, FaImages, FaComments } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const statCards = [
    { icon: FaCalendarAlt, label: 'Total Appointments', value: stats.totalAppointments, color: 'bg-blue-500' },
    { icon: FaHourglassHalf, label: 'Pending', value: stats.pendingAppointments, color: 'bg-yellow-500' },
    { icon: FaCheckCircle, label: 'Confirmed', value: stats.confirmedAppointments, color: 'bg-green-500' },
    { icon: FaClock, label: 'Completed', value: stats.completedAppointments, color: 'bg-purple-500' },
    { icon: FaClock, label: 'Active Services', value: stats.totalServices, color: 'bg-orange-500' },
    { icon: FaImages, label: 'Gallery Items', value: stats.totalGalleryItems, color: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2 text-sm lg:text-base">Overview of your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-4 lg:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-gray-600 text-xs lg:text-sm truncate">{stat.label}</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 lg:p-4 rounded-full flex-shrink-0`}>
                <stat.icon className="text-xl lg:text-2xl text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Recent Appointments</h2>
          <Link href="/admin/appointments" className="text-orange-600 hover:text-orange-700 font-medium text-sm lg:text-base">
            View All →
          </Link>
        </div>
        <div className="space-y-3 lg:space-y-4">
          {stats.recentAppointments.slice(0, 5).map((appointment) => (
            <div key={appointment._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 lg:p-4 bg-gray-50 rounded-lg">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900 truncate">{appointment.name}</p>
                <p className="text-sm text-gray-600 truncate">{appointment.service?.title}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(appointment.date).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs lg:text-sm font-medium self-start sm:self-auto ${
                appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {appointment.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Upcoming Appointments</h2>
        <div className="space-y-3 lg:space-y-4">
          {stats.upcomingAppointments.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No upcoming appointments</p>
          ) : (
            stats.upcomingAppointments.map((appointment) => (
              <div key={appointment._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 lg:p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">{appointment.name}</p>
                  <p className="text-sm text-gray-600 truncate">{appointment.service?.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(appointment.date).toLocaleDateString()} • {appointment.timeSlot}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs lg:text-sm font-medium self-start sm:self-auto ${
                  appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
