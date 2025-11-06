const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pandit-portfolio';

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const AdminSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      name: String,
      role: String,
    });

    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Username: admin');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new Admin({
      username: 'admin',
      email: 'admin@panditji.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'super-admin',
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Username: admin');
    console.log('🔐 Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nYou can now login at: http://localhost:3000/admin/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
