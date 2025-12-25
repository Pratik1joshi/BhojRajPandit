# Vercel Deployment Guide

## Prerequisites
1. A [Vercel](https://vercel.com) account
2. MongoDB Atlas database (already configured)
3. Cloudinary account (already configured)

## Deployment Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Import to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

### 3. Configure Environment Variables
In Vercel Dashboard → Project → Settings → Environment Variables, add:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.rdv0zrh.mongodb.net/pandit-portfolio?retryWrites=true&w=majority

NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate-random-32-char-string>

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=drlbmawxc
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=pandit_services

ADMIN_EMAIL=your-email@gmail.com
```

### 4. Generate NEXTAUTH_SECRET
Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```
Or use: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

### 5. MongoDB Atlas Network Access
1. Go to MongoDB Atlas → Network Access
2. Add Vercel's IP addresses or allow access from anywhere (0.0.0.0/0)

### 6. Create Admin User
After deployment, run the setup script:
1. Go to your Vercel deployment URL
2. You'll need to create the admin user manually in MongoDB Atlas, or
3. Use the local script first, then deploy

### 7. Cloudinary Upload Preset
Ensure your Cloudinary upload preset "pandit_services" is set to **Unsigned** mode in Cloudinary dashboard.

## Post-Deployment Checklist
- [ ] Website loads correctly
- [ ] Admin login works
- [ ] MongoDB connection is successful
- [ ] Image uploads work (Cloudinary)
- [ ] Email notifications work (SMTP)
- [ ] All API routes respond correctly
- [ ] Profile data displays correctly
- [ ] Services, Testimonials, Gallery all work

## Troubleshooting

### Build Errors
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify environment variables are set

### Database Connection Issues
- Check MongoDB Atlas network access
- Verify MONGODB_URI format
- Check database user permissions

### Image Upload Issues
- Verify Cloudinary credentials
- Check upload preset is "Unsigned"
- Ensure Next.js image domains are configured

### Admin Login Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Ensure admin user exists in database

## Custom Domain (Optional)
1. Go to Vercel → Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update NEXTAUTH_URL environment variable to your custom domain

## Maintenance
- Regularly backup your MongoDB database
- Monitor Vercel analytics and logs
- Keep dependencies updated
- Change admin password periodically through Settings page
