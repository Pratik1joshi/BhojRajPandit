'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certifications = [
    { name: 'Vedic Studies', institution: 'Sanskrit University', year: 2005 },
    { name: 'Purohit Certification', institution: 'Hindu Dharma Institute', year: 2008 },
    { name: 'Advanced Rituals', institution: 'Traditional Gurukul', year: 2010 },
  ];

  const specializations = [
    'Vedic Pujas',
    'Wedding Ceremonies',
    'Bratabandhan',
    'Housewarming Rituals',
    'Festival Celebrations',
    'Astrology Consultation',
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Pandit Image */}
              <Image
                src="/aboutimage.jpeg"
                alt="BhojRaj Pandit"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-white text-xl md:text-2xl font-bold">BhojRaj Pandit</h3>
                <p className="text-gray-200 mt-2 text-sm md:text-base">15+ Years of Service • 500+ Ceremonies</p>
                <p className="text-gray-300 mt-1 text-xs md:text-sm">Dedicated to preserving Hindu traditions</p>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white rounded-full shadow-2xl p-4 md:p-6"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600">500+</div>
                <div className="text-xs md:text-sm text-gray-600">Ceremonies</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              About Pandit Ji
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Preserving Traditions with{' '}
              <span className="text-orange-600">Devotion</span>
            </h2>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              With over 15 years of experience in performing traditional Hindu ceremonies, 
              I am dedicated to helping families celebrate their most important moments with 
              authenticity and spiritual significance.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Trained in Vedic studies and certified by renowned institutions, I offer 
              personalized guidance for all types of religious ceremonies, ensuring each 
              ritual is conducted according to traditional scriptures while accommodating 
              modern needs.
            </p>

            {/* Specializations */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Specializations</h3>
              <div className="grid grid-cols-2 gap-3">
                {specializations.map((spec, index) => (
                  <motion.div
                    key={spec}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <span className="text-gray-700">{spec}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-orange-50 p-4 rounded-lg"
                  >
                    <div className="font-semibold text-gray-900">{cert.name}</div>
                    <div className="text-sm text-gray-600">
                      {cert.institution} • {cert.year}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
