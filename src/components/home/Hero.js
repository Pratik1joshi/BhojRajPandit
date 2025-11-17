'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              <span className="text-orange-600">BhojRaj</span> Pandit
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
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
                  className="bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-orange-700 transition-colors shadow-xl"
                >
                  Book Appointment
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-orange-600 border-2 border-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-orange-50 transition-colors shadow-xl"
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
              className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-12"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600">15+</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600">500+</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Ceremonies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600">300+</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Happy Clients</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image with Glassy Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block relative"
          >
            <div className="relative w-full h-[500px] group">
              {/* Glassy container with watery hover effect */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Watery ripple effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-radial from-white/40 via-transparent to-transparent blur-xl"
                  />
                </div>

                {/* Glass morphism overlay */}
                <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-white/20 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_30px_rgba(251,146,60,0.5)] transition-all duration-500 z-10" />

                {/* Image - Replace with your actual image */}
                <div className="relative w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  {/* Placeholder - Replace this with your image */}
                  {/* <div className="text-center">
                    <span className="text-9xl mb-4 block filter drop-shadow-lg">🕉️</span>
                    <p className="text-orange-800 font-semibold text-lg">Add your image here</p>
                    <p className="text-orange-600 text-sm mt-2">Path: /public/images/pandit-hero.jpg</p>
                  </div> */}
                  
                  {/* Uncomment and use this when you have an image */}
                  <Image
                    src="/images/bhojrajhero.jpg"
                    alt="BhojRaj Pandit"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating particles effect */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-10 right-10 w-16 h-16 bg-orange-300/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    x: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute bottom-10 left-10 w-20 h-20 bg-blue-300/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>

              {/* Reflection effect */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-orange-200/40 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
