import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const appointment = await Appointment.findById(params.id).populate('service');
    
    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: appointment });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const appointment = await Appointment.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).populate('service');
    
    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: appointment });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const appointment = await Appointment.findByIdAndDelete(params.id);
    
    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
