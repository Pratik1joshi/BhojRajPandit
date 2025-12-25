import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const body = await request.json();
    const galleryItem = await Gallery.findByIdAndUpdate(
      id,
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
    const { id } = await params;
    
    const galleryItem = await Gallery.findByIdAndDelete(id);
    
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
