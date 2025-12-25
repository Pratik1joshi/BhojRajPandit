'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'puja', label: 'Puja Services' },
    { value: 'ceremony', label: 'Ceremonies' },
    { value: 'wedding', label: 'Wedding Rituals' },
    { value: 'housewarming', label: 'Housewarming' },
    { value: 'consultation', label: 'Consultation' },
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.category === selectedCategory));
    }
  }, [selectedCategory, services]);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data.data);
      setFilteredServices(response.data.data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-900 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-orange-100">
              <span>Our Services</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Sacred Ceremonies
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Traditional Hindu rituals performed with authenticity and devotion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.value
                    ? 'bg-orange-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-orange-800 border-t-transparent"></div>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No services found in this category</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      {service.image ? (
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
                          <span className="text-7xl">🕉️</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <div className="text-xs text-orange-800 font-medium mb-4 uppercase tracking-wide">{service.category}</div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {service.description}
                      </p>

                      {/* Book Button */}
                      <Link href={`/appointment?service=${service._id}`}>
                        <motion.button
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-orange-800 text-white py-3 rounded-lg font-medium hover:bg-orange-900 transition-all shadow-sm group-hover:shadow-md"
                        >
                          Book This Service
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl font-bold text-white mb-4">
            Need a Custom Service?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Contact us for personalized ceremonies tailored to your needs
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-100 transition-all shadow-lg"
            >
              Contact Us
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
