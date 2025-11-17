'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import { services, getServicesByCategory } from '@/data/services';

export default function ServicesPage() {
  const [filteredServices, setFilteredServices] = useState(services);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'puja', label: 'Puja Services' },
    { value: 'ceremony', label: 'Ceremonies' },
    { value: 'wedding', label: 'Wedding Rituals' },
    { value: 'housewarming', label: 'Housewarming' },
    { value: 'consultation', label: 'Consultation' },
  ];

  useEffect(() => {
    setFilteredServices(getServicesByCategory(selectedCategory));
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4"
          >
            Authentic Hindu ceremonies and rituals performed with devotion and expertise
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-4 md:py-8 sticky top-20 bg-white/95 backdrop-blur-md shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 md:space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            <FaFilter className="text-orange-600 flex-shrink-0 text-sm md:text-base" />
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.value
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 md:py-16 pb-24 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">No services found in this category</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  {/* Image */}
                  <div className={`h-48 bg-gradient-to-br ${service.color} flex items-center justify-center text-6xl`}>
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {service.category}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>

                    {/* Book Button */}
                    <Link href={`/appointment?service=${service.id}`}>
                      <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                        Book This Service
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Need a Custom Service?</h2>
          <p className="text-xl mb-8">Contact us for personalized ceremonies tailored to your needs</p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all"
            >
              Contact Us
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
