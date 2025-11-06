import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';

export async function GET() {
  try {
    await dbConnect();
    
    const profile = await Profile.findOne();
    
    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Profile not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = await Profile.create(body);
    } else {
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        body,
        { new: true, runValidators: true }
      );
    }
    
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
