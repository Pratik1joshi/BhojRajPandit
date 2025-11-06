'use client';
import { motion } from 'framer-motion';
import { FaAward, FaBook, FaStar, FaHeart } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About Pandit Ji
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Dedicated to preserving and sharing Hindu traditions with devotion
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">My Journey</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  With over 15 years of experience in performing Hindu religious ceremonies, I have dedicated my life to serving the spiritual needs of our community. My journey began at a traditional Gurukul where I studied Vedic scriptures, Sanskrit, and the intricate details of Hindu rituals.
                </p>
                <p>
                  I believe that every ceremony is not just a ritual but a sacred connection between individuals, their families, and the divine. My approach combines traditional authenticity with modern understanding, ensuring that each ceremony resonates with both the elders and the younger generation.
                </p>
                <p>
                  Having performed over 500 ceremonies, from simple home pujas to elaborate wedding rituals, I take pride in making each occasion memorable and spiritually meaningful. My goal is to preserve our rich cultural heritage while making it accessible and relevant to today's families.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
                <span className="text-9xl opacity-30">🕉️</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: FaAward, number: '15+', label: 'Years Experience' },
              { icon: FaBook, number: '500+', label: 'Ceremonies' },
              { icon: FaStar, number: '300+', label: 'Happy Clients' },
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
