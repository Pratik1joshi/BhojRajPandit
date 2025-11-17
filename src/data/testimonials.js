export const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    service: 'Wedding Ceremony',
    rating: 5,
    text: 'Pandit Ji conducted our wedding ceremony beautifully. Every ritual was explained and performed with utmost devotion. Highly recommended!',
    location: 'Mumbai, Maharashtra',
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
    location: 'Ahmedabad, Gujarat',
    image: '👨',
  },
  {
    id: 4,
    name: 'Sita Devi',
    service: 'Bratabandhan Ceremony',
    rating: 5,
    text: 'Our son\'s sacred thread ceremony was conducted with complete devotion. Pandit Ji guided us through every step beautifully.',
    location: 'Varanasi, UP',
    image: '👩',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    service: 'Ganesh Puja',
    rating: 5,
    text: 'Started our new business with Ganesh puja performed by Pandit Ji. Very blessed and grateful for his guidance!',
    location: 'Jaipur, Rajasthan',
    image: '👨',
  },
];

export const getTestimonialsByService = (serviceName) => 
  testimonials.filter(t => t.service.toLowerCase().includes(serviceName.toLowerCase()));
