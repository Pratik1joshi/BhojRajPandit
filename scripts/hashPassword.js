const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = process.argv[2] || 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Original Password:', password);
  console.log('Hashed Password:', hashedPassword);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\nUse this hashed password in MongoDB Atlas');
}

hashPassword();
