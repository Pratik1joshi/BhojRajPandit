import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const galleryItem = await Gallery.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!galleryItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: galleryItem });
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
    
    const galleryItem = await Gallery.findByIdAndDelete(params.id);
    
    if (!galleryItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
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
