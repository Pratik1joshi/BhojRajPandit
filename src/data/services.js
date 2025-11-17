export const services = [
  {
    id: 'wedding-ceremony',
    title: 'Complete Hindu Wedding Ceremony',
    description: 'Full traditional Hindu wedding with all rituals - Ganesh puja, Kanyadaan, Saptapadi (seven vows), and Sindoor ceremony. Experienced in various regional customs.',
    category: 'wedding',
    featured: true,
    icon: '💐',
    color: 'from-pink-400 to-red-500',
  },
  {
    id: 'griha-pravesh',
    title: 'Griha Pravesh (Housewarming Ceremony)',
    description: 'Complete housewarming ceremony with Vastu puja, Ganesh puja, and Navagraha puja. Ensures positive energy in your new home.',
    category: 'housewarming',
    featured: true,
    icon: '🏠',
    color: 'from-green-400 to-teal-500',
  },
  {
    id: 'bratabandhan',
    title: 'Bratabandhan (Sacred Thread Ceremony)',
    description: 'Traditional Bratabandhan ceremony marking the beginning of spiritual education. Complete rituals with all mantras and customs.',
    category: 'ceremony',
    featured: true,
    icon: '📿',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'satyanarayan-puja',
    title: 'Satyanarayan Puja',
    description: 'Traditional Satyanarayan Katha and puja performed at your home with all necessary materials and rituals. Brings prosperity and removes obstacles.',
    category: 'puja',
    featured: true,
    icon: '🪔',
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 'ganesh-puja',
    title: 'Ganesh Puja',
    description: 'Complete Ganesh puja for auspicious beginnings, new ventures, or removing obstacles. Includes Ganesh aarti and prasad distribution.',
    category: 'puja',
    featured: true,
    icon: '🙏',
    color: 'from-purple-400 to-indigo-500',
  },
  {
    id: 'astrology-consultation',
    title: 'Astrology Consultation',
    description: 'Personal astrology consultation including birth chart analysis, predictions, and remedies for life problems. Kundali matching also available.',
    category: 'consultation',
    featured: false,
    icon: '✨',
    color: 'from-blue-400 to-cyan-500',
  },
];

export const getServiceById = (id) => services.find(s => s.id === id);
export const getServicesByCategory = (category) => 
  category === 'all' ? services : services.filter(s => s.category === category);
export const getFeaturedServices = () => services.filter(s => s.featured);
