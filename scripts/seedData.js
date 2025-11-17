const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read .env.local to get MONGODB_URI (fallback to localhost)
function getMongoUri() {
  const envPath = path.join(__dirname, '..', '.env.local');
  try {
    const env = fs.readFileSync(envPath, 'utf8');
    const match = env.match(/MONGODB_URI=(.*)/);
    if (match && match[1]) return match[1].trim();
  } catch (e) {
    // ignore
  }
  return process.env.MONGODB_URI || 'mongodb://localhost:27017/pandit-portfolio';
}

const MONGODB_URI = getMongoUri();

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  featured: { type: Boolean, default: false },
  image: { type: String, default: '/images/services/default.jpg' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const TestimonialSchema = new mongoose.Schema({
  name: String,
  location: String,
  rating: { type: Number, default: 5 },
  text: String,
  image: { type: String, default: '/images/testimonials/default-avatar.jpg' },
  isApproved: { type: Boolean, default: true },
  service: String,
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

const sampleServices = [
  {
    title: 'Complete Hindu Wedding Ceremony',
    description: 'Full traditional Hindu wedding with all rituals - Ganesh puja, Kanyadaan, Saptapadi (seven vows), and Sindoor ceremony. Experienced in various regional customs.',
    category: 'wedding',
    featured: true,
    isActive: true,
  },
  {
    title: 'Griha Pravesh (Housewarming Ceremony)',
    description: 'Complete housewarming ceremony with Vastu puja, Ganesh puja, and Navagraha puja. Ensures positive energy in your new home.',
    category: 'housewarming',
    featured: true,
    isActive: true,
  },
  {
    title: 'Bratabandhan (Sacred Thread Ceremony)',
    description: 'Traditional Bratabandhan ceremony marking the beginning of spiritual education. Complete rituals with all mantras and customs.',
    category: 'ceremony',
    featured: true,
    isActive: true,
  },
  {
    title: 'Satyanarayan Puja',
    description: 'Traditional Satyanarayan Katha and puja performed at your home with all necessary materials and rituals. Brings prosperity and removes obstacles.',
    category: 'puja',
    featured: true,
    isActive: true,
  },
  {
    title: 'Ganesh Puja',
    description: 'Complete Ganesh puja for auspicious beginnings, new ventures, or removing obstacles. Includes Ganesh aarti and prasad distribution.',
    category: 'puja',
    featured: true,
    isActive: true,
  },
  {
    title: 'Astrology Consultation',
    description: 'Personal astrology consultation including birth chart analysis, predictions, and remedies for life problems. Kundali matching also available.',
    category: 'consultation',
    featured: false,
    isActive: true,
  },
];

const sampleTestimonials = [
  {
    name: 'Ramesh Sharma',
    location: 'Delhi, India',
    rating: 5,
    text: 'BhojRaj Pandit Ji performed Satyanarayan puja at our home. The way he conducted the ceremony was truly divine. Very knowledgeable and explains every ritual beautifully. Highly recommended!',
    service: 'Satyanarayan Puja',
    isApproved: true,
  },
  {
    name: 'Sita Devi',
    location: 'Noida, UP',
    rating: 5,
    text: 'Beautifully conducted housewarming ceremony. Pandit Ji arrived on time with all materials. The Griha Pravesh puja was performed with complete dedication. Felt very blessed!',
    service: 'Griha Pravesh',
    isApproved: true,
  },
  {
    name: 'Rajesh Kumar',
    location: 'Gurgaon, Haryana',
    rating: 5,
    text: 'Our son\'s Bratabandhan ceremony was made memorable by Pandit Ji. He guided us through every step and performed all rituals with perfect pronunciation. Very satisfied!',
    service: 'Bratabandhan Ceremony',
    isApproved: true,
  },
  {
    name: 'Priya & Vikram',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    text: 'We had our wedding ceremony performed by BhojRaj Pandit Ji. He made our special day even more beautiful with his knowledge and calm demeanor. Everything was perfect!',
    service: 'Hindu Wedding Ceremony',
    isApproved: true,
  },
  {
    name: 'Anita Verma',
    location: 'Jaipur, Rajasthan',
    rating: 5,
    text: 'Excellent service! Pandit Ji performed Lakshmi puja during Diwali at our home. Very professional and explains the significance of each ritual. Will definitely book again.',
    service: 'Lakshmi Puja',
    isApproved: true,
  },
  {
    name: 'Suresh Gupta',
    location: 'Lucknow, UP',
    rating: 5,
    text: 'Had Rudrabhishek done for my father\'s health. Pandit Ji performed the puja with complete devotion. My father is feeling much better now. Thank you Pandit Ji!',
    service: 'Rudrabhishek',
    isApproved: true,
  },
  {
    name: 'Kavita Singh',
    location: 'Chandigarh',
    rating: 5,
    text: 'Wonderful experience! Pandit Ji did Ganesh puja before we started our new business. Very knowledgeable and punctual. Our business is doing great now!',
    service: 'Ganesh Puja',
    isApproved: true,
  },
  {
    name: 'Mohan Lal',
    location: 'Indore, MP',
    rating: 5,
    text: 'Pandit Ji performed my mother\'s Shraadh ceremony with complete respect and proper rituals. He made sure everything was done according to our traditions. Very grateful!',
    service: 'Shraadh Rituals',
    isApproved: true,
  },
  {
    name: 'Deepak & Anjali',
    location: 'Pune, Maharashtra',
    rating: 5,
    text: 'Our daughter\'s Namkaran ceremony was beautiful. Pandit Ji suggested a wonderful name based on her birth chart. The entire ceremony was conducted perfectly!',
    service: 'Namkaran Ceremony',
    isApproved: true,
  },
  {
    name: 'Ravi Prakash',
    location: 'Bangalore, Karnataka',
    rating: 5,
    text: 'Very impressed with Pandit Ji\'s knowledge. He performed Vastu Shanti puja at our new office. The energy of the place has completely changed. Excellent work!',
    service: 'Vastu Shanti Puja',
    isApproved: true,
  },
  {
    name: 'Sunita Agarwal',
    location: 'Kolkata, West Bengal',
    rating: 5,
    text: 'BhojRaj Pandit Ji did Durga puja at our home during Navratri. All 9 days were conducted with such devotion. My whole family is very happy. Jai Maa Durga!',
    service: 'Durga Puja',
    isApproved: true,
  },
  {
    name: 'Amit Mishra',
    location: 'Varanasi, UP',
    rating: 5,
    text: 'Had Navagraha puja performed as per astrologer\'s advice. Pandit Ji explained each planet\'s significance and performed the havan perfectly. Feeling very positive now!',
    service: 'Navagraha Puja',
    isApproved: true,
  },
  {
    name: 'Geeta Bhardwaj',
    location: 'Dehradun, Uttarakhand',
    rating: 5,
    text: 'My son was having problems in studies. Pandit Ji suggested Saraswati puja and performed it beautifully. My son\'s concentration has improved significantly!',
    service: 'Saraswati Puja',
    isApproved: true,
  },
  {
    name: 'Manoj Kumar',
    location: 'Patna, Bihar',
    rating: 5,
    text: 'Pandit Ji performed Hanuman puja at my home. His recitation of Hanuman Chalisa was mesmerizing. Very dedicated and humble person. Highly recommend!',
    service: 'Hanuman Puja',
    isApproved: true,
  },
  {
    name: 'Pooja & Karan',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    text: 'Our engagement ceremony was made special by Pandit Ji. He conducted all rituals with perfect timing and made our families comfortable. Thank you so much!',
    service: 'Engagement Ceremony',
    isApproved: true,
  },
  {
    name: 'Harish Yadav',
    location: 'Agra, UP',
    rating: 5,
    text: 'Got my new car\'s puja done by BhojRaj Pandit Ji. Quick, efficient, and very reasonable pricing. My car is running perfectly! Blessed to have found such a good pandit.',
    service: 'Vehicle Puja',
    isApproved: true,
  },
  {
    name: 'Lata Joshi',
    location: 'Nashik, Maharashtra',
    rating: 5,
    text: 'Pandit Ji did Sunderkand path at our home. The atmosphere was so peaceful and divine. He has a beautiful voice and great knowledge of scriptures.',
    service: 'Sunderkand Path',
    isApproved: true,
  },
  {
    name: 'Vijay Singh',
    location: 'Surat, Gujarat',
    rating: 5,
    text: 'Had astrology consultation with Pandit Ji. His predictions were accurate and remedies were practical. Very happy with the guidance received. Will consult again!',
    service: 'Astrology Consultation',
    isApproved: true,
  },
  {
    name: 'Meena Reddy',
    location: 'Hyderabad, Telangana',
    rating: 5,
    text: 'My baby\'s Annaprashan ceremony was conducted beautifully by Pandit Ji. He was very patient and explained everything to us. Wonderful experience!',
    service: 'Annaprashan Ceremony',
    isApproved: true,
  },
  {
    name: 'Ashok Pandey',
    location: 'Bhopal, MP',
    rating: 5,
    text: 'Before starting construction of my house, Pandit Ji performed Bhoomi puja. Everything in the construction went smoothly. No problems at all. Very thankful!',
    service: 'Bhoomi Puja',
    isApproved: true,
  },
];

async function seed() {
  try {
    console.log('Connecting to', MONGODB_URI);
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log('✅ Connected to MongoDB');

    // Clear existing data to reseed with new expanded data
    console.log('🗑️  Clearing existing services and testimonials...');
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('✅ Cleared old data');

    // Insert new data
    await Service.insertMany(sampleServices);
    console.log(`✅ Inserted ${sampleServices.length} services`);

    await Testimonial.insertMany(sampleTestimonials);
    console.log(`✅ Inserted ${sampleTestimonials.length} testimonials`);

    const finalSvc = await Service.countDocuments();
    const finalTst = await Testimonial.countDocuments();
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📊 Final counts:`);
    console.log(`   Services: ${finalSvc}`);
    console.log(`   Testimonials: ${finalTst}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await mongoose.disconnect();
    console.log('✅ Seeding complete! Disconnected from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
}

seed();
