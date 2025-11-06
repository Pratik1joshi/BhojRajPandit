# Quick Setup Script for Creating Admin User

## Option 1: Using Node.js Script

Create a file `scripts/createAdmin.js`:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://localhost:27017/pandit-portfolio';

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const Admin = mongoose.model('Admin', new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      name: String,
      role: String,
    }));

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new Admin({
      username: 'admin',
      email: 'admin@panditji.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'super-admin',
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin();
```

Run it:
```powershell
node scripts/createAdmin.js
```

## Option 2: Using MongoDB Shell

```javascript
use pandit-portfolio

db.admins.insertOne({
  username: "admin",
  email: "admin@panditji.com",
  // Hash for "admin123"
  password: "$2a$10$rOmHQXV9z9qXK.qYLhF5EuXlF.pQpDKNXM3C9YpqO6/FVH0oUQ4ey",
  name: "Super Admin",
  role: "super-admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Option 3: Testing Without Database

For initial testing, you can modify the NextAuth configuration temporarily to use hardcoded credentials (not recommended for production).
