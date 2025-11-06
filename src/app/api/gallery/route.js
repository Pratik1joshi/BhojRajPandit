import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    const gallery = await Gallery.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: gallery });
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
    const galleryItem = await Gallery.create(body);
    
    return NextResponse.json({ success: true, data: galleryItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
