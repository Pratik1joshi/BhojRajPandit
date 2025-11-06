import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  date: {
    type: Date,
    required: [true, 'Please select a date'],
  },
  timeSlot: {
    type: String,
    required: [true, 'Please select a time slot'],
  },
  address: {
    type: String,
    required: [true, 'Please provide your address'],
  },
  city: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
