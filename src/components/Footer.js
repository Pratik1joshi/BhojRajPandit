'use client';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-3xl">🕉️</div>
              <div>
                <h3 className="text-xl font-bold text-orange-500">Pandit Ji</h3>
                <p className="text-sm text-gray-400">Religious Services</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Experienced Pandit providing authentic Hindu religious services for all occasions.
              Serving the community with devotion and expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-500">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-500">Our Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Puja Services</li>
              <li>• Bratabandhan Ceremony</li>
              <li>• Wedding Rituals</li>
              <li>• Housewarming Puja</li>
              <li>• Festival Celebrations</li>
              <li>• Custom Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-500">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <FaPhone className="text-orange-500" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaEnvelope className="text-orange-500" />
                <span>contact@panditji.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>Your City, State</span>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition-colors"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Pandit Ji. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/admin" className="hover:text-orange-500 transition-colors">
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
