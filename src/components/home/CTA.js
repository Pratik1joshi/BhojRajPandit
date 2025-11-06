'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { FaCalendarAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

export default function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-9xl">🕉️</div>
        <div className="absolute bottom-10 right-10 text-9xl">🪔</div>
        <div className="absolute top-1/2 left-1/3 text-7xl">📿</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Book Your Ceremony?
          </h2>
          <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto">
            Let's make your special occasion memorable with traditional rituals and spiritual guidance
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <Link href="/appointment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all flex items-center space-x-2"
              >
                <FaCalendarAlt />
                <span>Book Appointment</span>
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all flex items-center space-x-2"
              >
                <FaEnvelope />
                <span>Contact Us</span>
              </motion.button>
            </Link>
          </div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 text-white/90"
          >
            <div className="flex items-center space-x-2">
              <FaPhone className="text-2xl" />
              <div className="text-left">
                <div className="text-sm opacity-80">Call Us</div>
                <div className="font-semibold">+1 (234) 567-8900</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaWhatsapp className="text-2xl" />
              <div className="text-left">
                <div className="text-sm opacity-80">WhatsApp</div>
                <div className="font-semibold">+1 (234) 567-8900</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-2xl" />
              <div className="text-left">
                <div className="text-sm opacity-80">Email</div>
                <div className="font-semibold">contact@panditji.com</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
