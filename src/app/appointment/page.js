'use client';
import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCommentDots } from 'react-icons/fa';

function AppointmentForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service');

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || '',
    date: '',
    timeSlot: '',
    address: '',
    city: '',
    message: '',
  });

  const timeSlots = [
    '06:00 AM - 08:00 AM',
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM',
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data.data);
    } catch (error) {
      toast.error('Failed to load services');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/appointments', formData);
      toast.success('Appointment booked successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        timeSlot: '',
        address: '',
        city: '',
        message: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Book Your Appointment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Schedule your religious ceremony with us. We'll contact you to confirm the details.
          </motion.p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FaUser className="mr-3 text-orange-600" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      placeholder="+1 (234) 567-8900"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      placeholder="Your city"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FaCalendarAlt className="mr-3 text-orange-600" />
                  Service Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Service *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    >
                      <option value="">Choose a service...</option>
                      {services.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.title} - ₹{service.price} ({service.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={minDate}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Preferred Time Slot *
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    >
                      <option value="">Choose a time slot...</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-orange-600" />
                  Location
                </h3>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Enter complete address where ceremony will be held"
                  ></textarea>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FaCommentDots className="mr-3 text-orange-600" />
                  Additional Information
                </h3>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Special Requirements or Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Any special requirements, questions, or additional information..."
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-lg text-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Booking...' : 'Book Appointment'}
                </motion.button>
                <p className="text-center text-gray-600 text-sm mt-4">
                  * We will contact you within 24 hours to confirm your appointment
                </p>
              </div>
            </form>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-orange-50 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Important Information</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>All appointments are subject to availability and will be confirmed via phone/email</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Please book at least 3-5 days in advance for better scheduling</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>For urgent bookings or same-day services, please call us directly</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Prices may vary based on location and specific requirements</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
      </div>
    }>
      <AppointmentForm />
    </Suspense>
  );
}
