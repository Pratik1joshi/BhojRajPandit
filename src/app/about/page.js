'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaBook, FaStar, FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import axios from 'axios';

export default function AboutPage() {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
          >
            About {profile.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4"
          >
            {profile.title || 'Dedicated to preserving and sharing Hindu traditions with devotion'}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">My Journey</h2>
              <div className="prose prose-lg text-gray-600 space-y-4 text-sm md:text-base">
                {profile.bio ? (
                  <p className="whitespace-pre-wrap">{profile.bio}</p>
                ) : (
                  <>
                    <p>
                      With over {profile.experience} years of experience in performing Hindu religious ceremonies, I have dedicated my life to serving the spiritual needs of our community. My journey began at a traditional Gurukul where I studied Vedic scriptures, Sanskrit, and the intricate details of Hindu rituals.
                    </p>
                    <p>
                      I believe that every ceremony is not just a ritual but a sacred connection between individuals, their families, and the divine. My approach combines traditional authenticity with modern understanding, ensuring that each ceremony resonates with both the elders and the younger generation.
                    </p>
                    <p>
                      Having performed over {profile.ceremoniesCompleted || 500} ceremonies, from simple home pujas to elaborate wedding rituals, I take pride in making each occasion memorable and spiritually meaningful. My goal is to preserve our rich cultural heritage while making it accessible and relevant to today's families.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={profile.profileImage || '/aboutimage.jpeg'}
                alt={`${profile.name} - Experienced Hindu Priest`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold">{profile.name}</h3>
                <p className="text-sm md:text-base text-gray-200 mt-1">{profile.title || 'Vedic Scholar & Hindu Priest'}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: FaAward, number: `${profile.experience}+`, label: 'Years Experience' },
              { icon: FaBook, number: `${profile.ceremoniesCompleted || 500}+`, label: 'Ceremonies' },
              { icon: FaStar, number: `${profile.happyClients || 300}+`, label: 'Happy Clients' },
              { icon: FaHeart, number: '100%', label: 'Dedication' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <stat.icon className="text-5xl text-orange-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Philosophy */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">My Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Authenticity',
                  desc: 'Every ritual is performed according to traditional Vedic scriptures with complete adherence to proper procedures.',
                },
                {
                  title: 'Personalization',
                  desc: 'Understanding that each family is unique, I tailor ceremonies to respect individual preferences while maintaining traditional essence.',
                },
                {
                  title: 'Education',
                  desc: 'I believe in explaining the significance of each ritual, helping families understand and connect with their spiritual heritage.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-2xl font-bold text-orange-600 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
