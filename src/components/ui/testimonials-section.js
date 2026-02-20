'use client';

import { cn } from '@/lib/utils';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { motion } from 'framer-motion';

export function TestimonialsSection({ 
  title = "Client Experiences",
  description = "Trusted by families for authentic spiritual ceremonies",
  testimonials = [],
  className 
}) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        'bg-white text-gray-900',
        'py-16 sm:py-24 px-4',
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 sm:gap-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 text-center sm:gap-6"
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-900 px-4 py-2 rounded-full text-sm font-medium border border-orange-100">
            <span>Testimonials</span>
          </div>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="max-w-[720px] text-4xl sm:text-5xl font-bold text-gray-900 leading-tight"
          >
            {title}
          </h2>
          <p className="text-base sm:text-lg max-w-[600px] text-gray-600">
            {description}
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2">
            {/* First set of testimonials */}
            <div className="flex shrink-0 gap-4 animate-marquee">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard
                  key={`set1-${i}`}
                  author={{
                    name: testimonial.name,
                    avatar: testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=fed7aa&color=c2410c&bold=true`,
                  }}
                  text={testimonial.text}
                  rating={testimonial.rating || 5}
                  service={testimonial.service}
                />
              ))}
            </div>
            {/* Second set (duplicate for seamless loop) */}
            <div className="flex shrink-0 gap-4 animate-marquee" aria-hidden="true">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard
                  key={`set2-${i}`}
                  author={{
                    name: testimonial.name,
                    avatar: testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=fed7aa&color=c2410c&bold=true`,
                  }}
                  text={testimonial.text}
                  rating={testimonial.rating || 5}
                  service={testimonial.service}
                />
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 sm:w-1/3 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 sm:w-1/3 bg-gradient-to-l from-white via-white/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}
