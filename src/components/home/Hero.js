'use client';
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
    </div>
  ),
});

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              🕉️ Authentic Hindu Rituals
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              <span className="text-orange-600">BhojRaj</span> Pandit
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Experienced religious consultant offering traditional Hindu ceremonies, 
              pujas, and spiritual guidance with authenticity and devotion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <Link href="/appointment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transition-colors shadow-xl"
                >
                  Book Appointment
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 transition-colors shadow-xl"
                >
                  View Services
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600">15+</div>
                <div className="text-sm text-gray-600 mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-gray-600 mt-1">Ceremonies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600">300+</div>
                <div className="text-sm text-gray-600 mt-1">Happy Clients</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Decorative */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block relative"
          >
            <div className="relative w-full h-[500px]">
              {/* Decorative elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-10 bg-orange-200 rounded-full p-8"
              >
                <span className="text-6xl">🪔</span>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-20 left-10 bg-yellow-200 rounded-full p-6"
              >
                <span className="text-5xl">📿</span>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-200 rounded-full p-10"
              >
                <span className="text-7xl">🙏</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-orange-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
