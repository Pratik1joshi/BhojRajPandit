'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { FaClock, FaRupeeSign } from 'react-icons/fa';

export default function FeaturedServices() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      id: 1,
      title: 'Satyanarayan Puja',
      category: 'puja',
      description: 'Traditional worship for prosperity, success, and well-being of the family.',
      duration: '2-3 hours',
      price: '₹3,000',
      icon: '🪔',
      color: 'from-orange-400 to-red-500',
    },
    {
      id: 2,
      title: 'Bratabandhan Ceremony',
      category: 'bratabandhan',
      description: 'Sacred thread ceremony marking the beginning of spiritual education.',
      duration: '4-5 hours',
      price: '₹8,000',
      icon: '📿',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: 3,
      title: 'Wedding Rituals',
      category: 'wedding',
      description: 'Complete Hindu wedding ceremony with all traditional rituals and customs.',
      duration: 'Full Day',
      price: '₹15,000',
      icon: '💐',
      color: 'from-pink-400 to-red-500',
    },
    {
      id: 4,
      title: 'Griha Pravesh',
      category: 'housewarming',
      description: 'Housewarming ceremony for blessings and positive energy in new home.',
      duration: '2-3 hours',
      price: '₹5,000',
      icon: '🏠',
      color: 'from-green-400 to-teal-500',
    },
    {
      id: 5,
      title: 'Navgraha Puja',
      category: 'puja',
      description: 'Worship of nine planets to remove obstacles and bring harmony.',
      duration: '3-4 hours',
      price: '₹4,500',
      icon: '🌟',
      color: 'from-purple-400 to-indigo-500',
    },
    {
      id: 6,
      title: 'Custom Puja',
      category: 'custom',
      description: 'Personalized ceremonies tailored to your specific needs and requirements.',
      duration: 'Varies',
      price: 'Custom',
      icon: '✨',
      color: 'from-blue-400 to-cyan-500',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Religious <span className="text-orange-600">Services</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Authentic Hindu ceremonies performed with traditional rituals and devotion
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
            >
              {/* Header with Icon */}
              <div className={`bg-gradient-to-br ${service.color} p-8 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-9xl opacity-20 transform translate-x-6 -translate-y-6">
                  {service.icon}
                </div>
                <div className="relative z-10">
                  <span className="text-6xl">{service.icon}</span>
                  <h3 className="text-2xl font-bold text-white mt-4">{service.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaClock className="mr-2" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center text-lg font-bold text-orange-600">
                    <span>{service.price}</span>
                  </div>
                </div>

                <Link href="/appointment">
                  <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors group-hover:shadow-lg">
                    Book Now
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-colors shadow-lg"
            >
              View All Services
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
