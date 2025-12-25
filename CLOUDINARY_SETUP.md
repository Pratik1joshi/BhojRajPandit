# Cloudinary Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Free Cloudinary Account
1. Go to https://cloudinary.com/users/register_free
2. Sign up with your email
3. Verify your email

### Step 2: Get Your Credentials
1. Login to Cloudinary Dashboard
2. You'll see:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key**
   - **API Secret**

### Step 3: Create Upload Preset
1. Click **Settings** (gear icon) in top right
2. Click **Upload** tab in left sidebar
3. Scroll to **Upload presets**
4. Click **Add upload preset**
5. Settings:
   - **Preset name**: `pandit_services`
   - **Signing Mode**: Select **Unsigned**
   - **Folder**: `services` (optional)
   - Click **Save**

### Step 4: Update Your .env.local File

Open `.env.local` and update these values:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=pandit_services
```

Replace `your_cloud_name_here` with your actual Cloudinary cloud name (e.g., `dxyz123abc`)

**Important:** After updating .env.local, restart your dev server:
```bash
# Stop the server (Ctrl+C), then restart:
npm run dev
```

### Step 5: Test It!
1. Go to your admin panel
2. Add/Edit a service
3. Click "Upload Image"
4. Select an image from your computer
5. It should upload and show a preview!

## Features
✅ **Direct Upload** - Upload from your device
✅ **URL Support** - Still works with image URLs
✅ **Preview** - See image before saving
✅ **Delete** - Remove uploaded image
✅ **Free Tier** - 25GB storage, 25GB bandwidth/month

## Alternative: Use Image URLs (No Setup)
If you don't want to setup Cloudinary, you can still paste image URLs from:
- Imgur.com
- ImgBB.com
- Any direct image link

The image URL input field still works!
