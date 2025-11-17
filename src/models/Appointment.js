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
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: [true, 'Please select a date'],
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

// Clear the cached model to ensure schema updates are applied
if (mongoose.models.Appointment) {
  delete mongoose.models.Appointment;
}

export default mongoose.model('Appointment', AppointmentSchema);
