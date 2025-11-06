import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: '/images/testimonials/default-avatar.jpg',
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
