'use client';
import { useTestimonials } from '@/context/DataCacheContext';
import { TestimonialsSection } from '@/components/ui/testimonials-section';

export default function Testimonials() {
  const { testimonials: allTestimonials, loading } = useTestimonials();
  const approvedTestimonials = allTestimonials.filter(t => t.isApproved);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-orange-800 border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <TestimonialsSection
      title="Client Experiences"
      description="Trusted by families for authentic spiritual ceremonies"
      testimonials={approvedTestimonials}
    />
  );
}
