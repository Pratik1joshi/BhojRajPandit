import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a service title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  category: {
    type: String,
    required: true,
    enum: ['puja', 'ceremony', 'wedding', 'housewarming', 'consultation', 'other'],
  },
  image: {
    type: String,
    default: '/images/services/default.jpg',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  requirements: [{
    type: String,
  }],
  benefits: [{
    type: String,
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
