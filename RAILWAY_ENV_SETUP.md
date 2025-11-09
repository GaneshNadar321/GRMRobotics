# 🚂 Railway Environment Variables Setup

## ⚠️ CRITICAL: Database URL Issue Found

Your current `.env` file has:
```
DATABASE_URL="postgresql://postgres:Ganesh@123@localhost:5432/grm_robotics?schema=public"
```

**This won't work on Railway!** Railway needs your **Neon database URL**.

## 🔧 Required Environment Variables for Railway

### 1. Database Configuration
```
DATABASE_URL=postgresql://neondb_owner:your_password@ep-twilight-resonance-a1sqm9xo-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```
**⚠️ Replace with your actual Neon database connection string!**

### 2. JWT Secrets (Copy from your .env)
```
JWT_SECRET=a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261
JWT_EXPIRES_IN=365d
REFRESH_TOKEN_SECRET=cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e
REFRESH_TOKEN_EXPIRES_IN=365d
```

### 3. Razorpay Configuration
```
RAZORPAY_KEY_ID=rzp_test_Rcs02GVJSBCdpe
RAZORPAY_KEY_SECRET=HOgOaN1NMTivnmRUDL0lgct2
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### 4. Email Configuration (Gmail)
```
EMAIL_FROM=noreply@grmrobotics.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=infogrmrobotics@gmail.com
EMAIL_PASS=djwy qlvu sndn wzpw
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=infogrmrobotics@gmail.com
SMTP_PASS=djwy qlvu sndn wzpw
```

### 5. Production Settings
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://grmrobotics.com
STORAGE_TYPE=local
UPLOAD_DIR=./uploads
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 6. OpenSSL Fix
```
OPENSSL_CONF=/dev/null
```

## 📋 How to Add These to Railway

1. **Go to Railway Dashboard**
   - Open your project
   - Click on your backend service

2. **Navigate to Variables Tab**
   - Click "Variables" in the sidebar
   - Add each variable one by one

3. **Add Variables**
   - Click "New Variable"
   - Enter variable name and value
   - Click "Add"

## 🔍 Get Your Neon Database URL

1. **Go to Neon Console**
   - Visit: https://console.neon.tech
   - Select your project

2. **Get Connection String**
   - Go to "Dashboard"
   - Click "Connection Details"
   - Copy the "Connection string"
   - It should look like:
   ```
   postgresql://neondb_owner:password@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require
   ```

3. **Use This URL**
   - Copy this exact URL
   - Add it as `DATABASE_URL` in Railway

## 🚀 After Adding Variables

1. **Redeploy**
   - Railway will automatically redeploy
   - Or manually trigger deployment

2. **Check Logs**
   - Monitor deployment logs
   - Look for successful database connection

## ✅ Verification

Your deployment should show:
```
✅ Database connected successfully
✅ Prisma client generated
✅ Migrations applied
✅ Server started on port 3001
```

## 🔧 If Still Having Issues

Try these Railway settings:

**Build Command:**
```
cd backend && npm install && npm run build && OPENSSL_CONF=/dev/null npm run prisma:generate
```

**Start Command:**
```
cd backend && OPENSSL_CONF=/dev/null npm run start
```

**Root Directory:**
```
backend
```