const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local to get MONGODB_URI
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

const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  email: String,
  phone: String,
  whatsapp: String,
  address: String,
  city: String,
  state: String,
  experience: Number,
  ceremoniesCompleted: Number,
  happyClients: Number,
  specializations: [String],
  languages: [String],
  certifications: [{
    name: String,
    year: Number,
    institution: String,
  }],
  socialMedia: {
    facebook: String,
    instagram: String,
    youtube: String,
    twitter: String,
  },
  profileImage: String,
  coverImage: String,
  availability: Boolean,
}, {
  timestamps: true,
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

async function createProfile() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if profile already exists
    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      console.log('Profile already exists!');
      console.log('Name:', existingProfile.name);
      process.exit(0);
    }

    // Create default profile
    const profile = await Profile.create({
      name: 'BhojRaj Pandit',
      title: 'Hindu Religious Consultant',
      bio: 'With over 15 years of experience in performing Hindu religious ceremonies, I have dedicated my life to serving the spiritual needs of our community. My journey began at a traditional Gurukul where I studied Vedic scriptures, Sanskrit, and the intricate details of Hindu rituals.',
      email: 'contact@panditji.com',
      phone: '+1 (234) 567-8900',
      whatsapp: '+1 (234) 567-8900',
      address: 'Your Address',
      city: 'Your City',
      state: 'Your State',
      experience: 15,
      ceremoniesCompleted: 500,
      happyClients: 300,
      specializations: [
        'Vedic Pujas',
        'Wedding Ceremonies',
        'Bratabandhan',
        'Housewarming Rituals',
        'Festival Celebrations',
        'Astrology Consultation'
      ],
      languages: ['Hindi', 'English', 'Sanskrit'],
      certifications: [
        { name: 'Vedic Studies', institution: 'Sanskrit University', year: 2005 },
        { name: 'Purohit Certification', institution: 'Hindu Dharma Institute', year: 2008 },
        { name: 'Advanced Rituals', institution: 'Traditional Gurukul', year: 2010 }
      ],
      availability: true,
    });

    console.log('Profile created successfully!');
    console.log('Name:', profile.name);
    console.log('Title:', profile.title);
    console.log('Experience:', profile.experience, 'years');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating profile:', error);
    process.exit(1);
  }
}

createProfile();
