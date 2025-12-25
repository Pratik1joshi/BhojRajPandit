'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

export default function Hero() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('/api/profile');
      if (data.success && data.data) {
        setProfile(data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  if (!profile) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #c2410c 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-orange-50 text-orange-900 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-orange-100"
            >
              <span className="text-lg">🕉️</span>
              <span>Traditional Hindu Ceremonies</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {profile.name.split(' ')[0]}<br/>
              <span className="text-orange-800">{profile.name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg"
            >
              {profile.bio || `Preserving sacred traditions with ${profile.experience}+ years of experience in authentic Hindu rituals, pujas, and spiritual ceremonies.`}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <Link href="/appointment">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-orange-800 text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-orange-900 transition-all shadow-sm hover:shadow-md"
                >
                  Book Appointment
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-orange-800 border border-gray-200 px-8 py-4 rounded-lg text-base font-medium hover:border-orange-800 transition-all shadow-sm hover:shadow-md"
                >
                  View Services
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-100"
            >
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-1">{profile.experience}+</div>
                <div className="text-sm text-gray-500">Years</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-1">{profile.ceremoniesCompleted || 500}+</div>
                <div className="text-sm text-gray-500">Ceremonies</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-1">{profile.happyClients || 300}+</div>
                <div className="text-sm text-gray-500">Families</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:block relative"
          >
            <div className="relative w-full h-[600px] group">
              {/* Image container */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-orange-900/10"
              >
                {/* Border accent */}
                <div className="absolute inset-0 rounded-2xl border border-gray-100 z-10 pointer-events-none" />
                
                {/* Image */}
                <div className="relative w-full h-full bg-gradient-to-br from-orange-50 to-orange-100">
                  <Image
                    src={profile.profileImage || '/images/bhojrajhero.jpg'}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 rounded-2xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
