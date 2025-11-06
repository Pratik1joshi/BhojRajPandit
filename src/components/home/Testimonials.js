'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar } from 'react-icons/fa';

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      service: 'Wedding Ceremony',
      rating: 5,
      text: 'Pandit Ji conducted our wedding ceremony beautifully. Every ritual was explained and performed with utmost devotion. Highly recommended!',
      location: 'Mumbai',
      image: '👨',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      service: 'Satyanarayan Puja',
      rating: 5,
      text: 'Very knowledgeable and professional. The puja was conducted perfectly, and we felt truly blessed. Thank you Pandit Ji!',
      location: 'Delhi',
      image: '👩',
    },
    {
      id: 3,
      name: 'Amit Patel',
      service: 'Griha Pravesh',
      rating: 5,
      text: 'Excellent service! Pandit Ji made our housewarming ceremony memorable. Very punctual and thorough with all the rituals.',
      location: 'Ahmedabad',
      image: '👨',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-orange-600">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Read experiences shared by families we've had the honor to serve
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.service}</div>
                  <div className="text-xs text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
