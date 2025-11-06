import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  experience: {
    type: Number,
    required: true,
  },
  specializations: [{
    type: String,
  }],
  languages: [{
    type: String,
  }],
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
  profileImage: {
    type: String,
    default: '/images/profile/default.jpg',
  },
  coverImage: {
    type: String,
  },
  availability: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
