const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Read .env.local to get MONGODB_URI
function getMongoUri() {
  const envPath = path.join(__dirname, '..', '.env.local');
  try {
    const env = fs.readFileSync(envPath, 'utf8');
    const match = env.match(/MONGODB_URI=(.*)/);
    if (match && match[1]) return match[1].trim();
  } catch (e) {
    // ignore
  }
  return process.env.MONGODB_URI || 'mongodb://localhost:27017/pandit-portfolio';
}

const MONGODB_URI = getMongoUri();

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
