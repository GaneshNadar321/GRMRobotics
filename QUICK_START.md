# 🚀 Quick Start Guide

## ✅ Build Status: SUCCESS!

Your project has been built successfully! Here's what to do next:

## 📋 Prerequisites Checklist

- [ ] **Node.js** installed (v18+)
- [ ] **PostgreSQL** database running
- [ ] **Git** installed

## 🔧 Setup Steps

### 1. Environment Configuration

Create these environment files:

**Backend (.env in backend/ folder):**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/grm_robotics"
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_SECRET="your-refresh-token-secret-different-from-jwt"
REFRESH_TOKEN_EXPIRES_IN="30d"
PORT=5000
NODE_ENV="development"

# Email (Optional - for order confirmations)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Payment (Optional - for Razorpay)
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your-razorpay-secret"
```

**Frontend (.env.local in frontend/ folder):**
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
```

### 2. Database Setup

**Option A: Use the setup script (Recommended)**
```bash
setup-database.bat
```

**Option B: Manual setup**
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate:dev
npm run seed  # Optional: adds sample data
```

### 3. Start Development Servers

**Option A: Use the start script**
```bash
start-dev.bat
```

**Option B: Manual start**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🌐 Access Your Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database Admin**: `cd backend && npm run prisma:studio`

## 🔍 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Make sure PostgreSQL is running
   - Check your DATABASE_URL in backend/.env
   - Ensure the database exists

2. **Port Already in Use**
   - Kill existing processes: `taskkill /f /im node.exe`
   - Or change PORT in backend/.env

3. **Environment Variables Not Loading**
   - Ensure .env files are in correct directories
   - Restart servers after changing .env files

### Quick Fixes:

```bash
# Clear node_modules and reinstall
cd backend && rmdir /s node_modules && npm install
cd frontend && rmdir /s node_modules && npm install

# Reset database
cd backend && npm run prisma:migrate:reset
```

## 📁 Project Structure

```
GRM Website/
├── backend/           # Express.js API (Port 5000)
│   ├── src/          # Source code
│   ├── prisma/       # Database schema
│   └── .env          # Backend environment variables
├── frontend/         # Next.js React app (Port 3000)
│   ├── src/          # Source code
│   └── .env.local    # Frontend environment variables
└── build.bat         # Build script
```

## 🎯 Next Steps

1. **Test the application**: Visit http://localhost:3000
2. **Create admin user**: Register and manually change role to 'ADMIN' in database
3. **Add products**: Use the admin panel to add your robotics products
4. **Configure payments**: Set up Razorpay for real payments
5. **Configure email**: Set up SMTP for order confirmations

## 📚 Additional Resources

- **Full Documentation**: See BUILD_GUIDE.md
- **OAuth Setup**: See OAUTH_SETUP_GUIDE.md
- **Database Schema**: Check backend/prisma/schema.prisma

## 🆘 Need Help?

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set
3. Ensure PostgreSQL is running
4. Try the troubleshooting steps above

---

**🎉 Congratulations! Your GRM Robotics e-commerce platform is ready to go!**