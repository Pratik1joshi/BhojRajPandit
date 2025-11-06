import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['puja', 'bratabandhan', 'wedding', 'housewarming', 'festival', 'other'],
  },
  tags: [{
    type: String,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
