# 🚀 Quick Start Guide - Pandit Portfolio Website

## Prerequisites Checklist
- [ ] Node.js 18+ installed
- [ ] MongoDB installed OR MongoDB Atlas account
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command Prompt access

---

## Step-by-Step Setup

### 1️⃣ Navigate to Project
```powershell
cd c:\Users\ADMIN\Desktop\TheWildStartssssss\BhojrajPandit\pandit-portfolio
```

### 2️⃣ Install Dependencies (Already Done)
The packages are already installed, but if needed:
```powershell
npm install
```

### 3️⃣ Start MongoDB

**Option A: Local MongoDB**
```powershell
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `.env.local` file

### 4️⃣ Configure Environment Variables
The `.env.local` file is already created. Update if needed:

```env
MONGODB_URI=mongodb://localhost:27017/pandit-portfolio
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 5️⃣ Create Admin User

**Method 1: Using Script (Recommended)**
```powershell
node scripts/createAdmin.js
```

**Method 2: Manual MongoDB**
```javascript
// Connect to MongoDB shell
mongosh

// Switch to database
use pandit-portfolio

// Create admin
db.admins.insertOne({
  username: "admin",
  email: "admin@panditji.com",
  password: "$2a$10$rOmHQXV9z9qXK.qYLhF5EuXlF.pQpDKNXM3C9YpqO6/FVH0oUQ4ey",
  name: "Super Admin",
  role: "super-admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### 6️⃣ Add Sample Services (Optional)

Connect to MongoDB and run:
```javascript
use pandit-portfolio

db.services.insertMany([
  {
    title: "Satyanarayan Puja",
    description: "Traditional worship for prosperity and well-being",
    category: "puja",
    price: 3000,
    duration: "2-3 hours",
    featured: true,
    isActive: true,
    requirements: ["Puja items", "Clean space", "Family members present"],
    benefits: ["Prosperity", "Peace", "Divine blessings"],
    image: "/images/services/satyanarayan.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Bratabandhan Ceremony",
    description: "Sacred thread ceremony for boys",
    category: "bratabandhan",
    price: 8000,
    duration: "4-5 hours",
    featured: true,
    isActive: true,
    requirements: ["Traditional attire", "Sacred thread", "Ceremony items"],
    benefits: ["Spiritual initiation", "Cultural tradition"],
    image: "/images/services/bratabandhan.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Wedding Rituals",
    description: "Complete Hindu wedding ceremony",
    category: "wedding",
    price: 15000,
    duration: "Full Day",
    featured: true,
    isActive: true,
    requirements: ["Wedding venue", "All ritual items", "Family coordination"],
    benefits: ["Sacred union", "Traditional blessings"],
    image: "/images/services/wedding.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

### 7️⃣ Start Development Server
```powershell
npm run dev
```

### 8️⃣ Access the Application

**Main Website:**
🌐 http://localhost:3000

**Admin Panel:**
🔐 http://localhost:3000/admin/login

**Admin Credentials:**
- Username: `admin`
- Password: `admin123`

---

## 📝 First Steps After Login

### As Admin:
1. Login at `/admin/login`
2. View dashboard statistics
3. Add services via Admin > Services
4. Configure profile settings
5. Test appointment booking from main site

### As User (Testing):
1. Browse services
2. Book an appointment
3. Fill contact form
4. View gallery and testimonials

---

## 🎯 Main Features to Test

### Public Pages
- ✅ Home page with 3D animations
- ✅ Services listing and filtering
- ✅ Appointment booking system
- ✅ Gallery with categories
- ✅ Testimonials display
- ✅ About page
- ✅ Contact form

### Admin Panel
- ✅ Dashboard with stats
- ✅ Appointment management (view, update status, delete)
- ✅ Service management (CRUD operations)
- ✅ Gallery management
- ✅ Testimonial approval
- ✅ Profile settings

---

## 🐛 Troubleshooting

### MongoDB Connection Error
**Problem:** Cannot connect to MongoDB
**Solution:**
```powershell
# Check if MongoDB is running
mongod --version

# Start MongoDB service
net start MongoDB

# Or use MongoDB Compass to start
```

### Admin Login Not Working
**Problem:** Invalid credentials
**Solution:**
1. Verify admin user exists in database
2. Run `node scripts/createAdmin.js` again
3. Check MongoDB connection

### Port Already in Use
**Problem:** Port 3000 is busy
**Solution:**
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
$env:PORT=3001; npm run dev
```

### Build Errors
**Problem:** Build fails
**Solution:**
```powershell
# Clear cache
rm -r .next
rm -r node_modules
npm install
npm run build
```

---

## 📚 Key URLs

| Page | URL | Description |
|------|-----|-------------|
| Home | / | Landing page with hero |
| Services | /services | All services listing |
| Appointment | /appointment | Booking form |
| About | /about | About the Pandit |
| Gallery | /gallery | Photo gallery |
| Testimonials | /testimonials | Client reviews |
| Contact | /contact | Contact form |
| Admin Login | /admin/login | Admin access |
| Dashboard | /admin/dashboard | Admin overview |
| Manage Appointments | /admin/appointments | Booking management |
| Manage Services | /admin/services | Service CRUD |

---

## 🔒 Security Notes

1. **Change Default Password:** After first login, create new admin user
2. **Environment Variables:** Never commit `.env.local` to git
3. **NEXTAUTH_SECRET:** Generate secure key:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
4. **Production:** Use environment-specific variables

---

## 🌟 Next Steps

1. **Customize Content:**
   - Update profile information in Admin > Profile
   - Add your services via Admin > Services
   - Upload ceremony photos to Gallery
   - Configure email settings for notifications

2. **Branding:**
   - Update logo and colors in `tailwind.config.js`
   - Modify 3D elements in `src/components/3d/`
   - Update contact information in Footer

3. **Deploy:**
   - Push to GitHub
   - Deploy on Vercel
   - Configure production environment variables
   - Set up MongoDB Atlas for production

---

## 📞 Support

- Check README.md for full documentation
- Review SETUP.md for detailed configuration
- Check console for error messages
- Verify MongoDB connection string

---

## ✨ Features Included

✅ Full-stack Next.js application  
✅ 3D animations with Three.js  
✅ MongoDB database integration  
✅ Admin authentication system  
✅ Appointment booking with email  
✅ Service management  
✅ Gallery with categories  
✅ Testimonial system  
✅ Responsive design  
✅ Modern UI with Tailwind CSS  
✅ Smooth animations with Framer Motion  

---

**Happy Coding! 🚀**

For questions or issues, refer to the main README.md file.
