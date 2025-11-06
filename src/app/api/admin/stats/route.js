import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import Service from '@/models/Service';
import Testimonial from '@/models/Testimonial';
import Gallery from '@/models/Gallery';

export async function GET() {
  try {
    await dbConnect();
    
    // Get counts
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    const confirmedAppointments = await Appointment.countDocuments({ status: 'confirmed' });
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
    const totalServices = await Service.countDocuments({ isActive: true });
    const totalTestimonials = await Testimonial.countDocuments({ isApproved: true });
    const totalGalleryItems = await Gallery.countDocuments();
    
    // Get recent appointments
    const recentAppointments = await Appointment.find()
      .populate('service')
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get upcoming appointments
    const upcomingAppointments = await Appointment.find({
      date: { $gte: new Date() },
      status: { $in: ['pending', 'confirmed'] }
    })
      .populate('service')
      .sort({ date: 1 })
      .limit(5);
    
    const stats = {
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      totalServices,
      totalTestimonials,
      totalGalleryItems,
      recentAppointments,
      upcomingAppointments,
    };
    
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
