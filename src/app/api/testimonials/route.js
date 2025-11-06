import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get('approved');
    const featured = searchParams.get('featured');
    
    let query = {};
    
    if (approved === 'true') {
      query.isApproved = true;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: testimonials });
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
    const testimonial = await Testimonial.create(body);
    
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
