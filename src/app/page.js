import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import FeaturedServices from '@/components/home/FeaturedServices';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedServices />
      <Testimonials />
      <CTA />
    </main>
  );
}
