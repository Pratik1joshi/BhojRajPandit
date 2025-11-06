import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import nodemailer from 'nodemailer';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }
    
    const appointments = await Appointment.find(query)
      .populate('service')
      .sort({ date: -1 });
    
    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const appointment = await Appointment.create(body);
    
    // Populate service details for email
    await appointment.populate('service');
    
    // Send confirmation email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: appointment.email,
        subject: 'Appointment Confirmation - Pandit Services',
        html: `
          <h2>Appointment Confirmed</h2>
          <p>Dear ${appointment.name},</p>
          <p>Your appointment has been received successfully.</p>
          <h3>Appointment Details:</h3>
          <ul>
            <li><strong>Service:</strong> ${appointment.service.title}</li>
            <li><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString()}</li>
            <li><strong>Time:</strong> ${appointment.timeSlot}</li>
            <li><strong>Address:</strong> ${appointment.address}, ${appointment.city}</li>
          </ul>
          <p>We will contact you shortly to confirm the details.</p>
          <p>Thank you!</p>
        `,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }
    
    return NextResponse.json({ success: true, data: appointment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
