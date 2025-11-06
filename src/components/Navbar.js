'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaWhatsapp } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="text-3xl">🕉️</div>
              <div>
                <h1 className={`text-2xl font-bold transition-all ${scrolled ? 'text-orange-600' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>
                  Pandit Ji
                </h1>
                <p className={`text-xs transition-all ${scrolled ? 'text-gray-600' : 'text-gray-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'}`}>
                  Religious Services
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`font-medium transition-colors ${
                    scrolled
                      ? 'text-gray-700 hover:text-orange-600'
                      : 'text-white hover:text-orange-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <Link href="/appointment">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-600 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors shadow-lg"
              >
                Book Appointment
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-orange-600 font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/appointment" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-orange-600 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-700 transition-colors">
                  Book Appointment
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 flex flex-col space-y-4 z-40">
        <motion.a
          href="tel:+1234567890"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          <FaPhone size={24} />
        </motion.a>
        <motion.a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <FaWhatsapp size={24} />
        </motion.a>
      </div>
    </nav>
  );
}
