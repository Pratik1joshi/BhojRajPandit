# MongoDB Setup Guide

Since MongoDB is not installed locally, you have two options:

## Option 1: Use MongoDB Atlas (Recommended - Free Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Select "FREE" tier (M0 Sandbox)
   - Choose your preferred cloud provider and region (closest to you)
   - Click "Create"

3. **Configure Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`)

6. **Update .env.local**
   - Open `.env.local` in your project
   - Replace the MONGODB_URI with your connection string
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add the database name at the end: `/pandit-portfolio`
   
   Example:
   ```
   MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/pandit-portfolio?retryWrites=true&w=majority
   ```

7. **Restart the Development Server**
   ```powershell
   npm run dev
   ```

## Option 2: Install MongoDB Locally

1. **Download MongoDB Community Server**
   - Go to https://www.mongodb.com/try/download/community
   - Download the Windows MSI installer
   - Run the installer and follow the setup wizard
   - Choose "Complete" installation
   - Install MongoDB as a Windows Service

2. **Verify Installation**
   ```powershell
   mongod --version
   ```

3. **Start MongoDB Service**
   ```powershell
   net start MongoDB
   ```

4. **Keep the current .env.local configuration**
   ```
   MONGODB_URI=mongodb://localhost:27017/pandit-portfolio
   ```

5. **Restart the Development Server**
   ```powershell
   npm run dev
   ```

## Testing the Connection

After setup, visit these URLs to test:
- http://localhost:3000/api/services - Should return `[]` or service data
- http://localhost:3000/api/testimonials - Should return `[]` or testimonial data

If you see data or empty arrays (not 500 errors), the connection is working!

## Creating Admin User

After MongoDB is connected, create an admin user:

```powershell
node scripts/createAdmin.js
```

Default credentials:
- Email: admin@panditji.com
- Password: admin123

**Important:** Change these credentials in production!
