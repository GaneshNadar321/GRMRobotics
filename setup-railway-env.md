# 🚂 Quick Railway Environment Setup

## Copy these environment variables to Railway:

```bash
# Database (Your updated Neon URL with channel_binding)
DATABASE_URL=postgresql://neondb_owner:npg_8JpeoAblRS4W@ep-twilight-resonance-a1sqm9xo-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# JWT Configuration
JWT_SECRET=a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261
JWT_EXPIRES_IN=365d
REFRESH_TOKEN_SECRET=cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e
REFRESH_TOKEN_EXPIRES_IN=365d

# Razorpay
RAZORPAY_KEY_ID=rzp_test_Rcs02GVJSBCdpe
RAZORPAY_KEY_SECRET=HOgOaN1NMTivnmRUDL0lgct2
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Email
EMAIL_FROM=noreply@grmrobotics.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=infogrmrobotics@gmail.com
EMAIL_PASS=djwy qlvu sndn wzpw
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=infogrmrobotics@gmail.com
SMTP_PASS=djwy qlvu sndn wzpw

# Production Settings
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://grmrobotics.com
STORAGE_TYPE=local
UPLOAD_DIR=./uploads
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# SSL Fix
OPENSSL_CONF=/dev/null
```

## 🎯 Key Fix: DATABASE_URL

**CRITICAL:** Replace the DATABASE_URL with your actual Neon database connection string!

Get it from: https://console.neon.tech → Your Project → Connection Details