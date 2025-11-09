# 🚀 FREE Deployment Guide - GRM Robotics to Market

## 🎯 Complete Step-by-Step Guide (100% FREE)

This guide will help you deploy your GRM Robotics platform to the internet for FREE using the best free hosting services.

## 📋 What We'll Deploy

- **Frontend**: Next.js website (your customer-facing store)
- **Backend**: Node.js API (handles orders, payments, etc.)
- **Database**: PostgreSQL (stores products, users, orders)

## 🌐 FREE Hosting Services We'll Use

1. **Frontend**: Vercel (FREE - unlimited bandwidth)
2. **Backend**: Railway (FREE - $5 credit monthly)
3. **Database**: Neon (FREE - 512MB PostgreSQL)
4. **Domain**: Freenom (FREE .tk/.ml domains) or use Railway/Vercel subdomains

## 🔧 Step 1: Prepare Your Code for Production

### 1.1 Update Environment Variables

**Create `frontend/.env.production`:**
```env
# Replace with your actual domain after deployment
NEXT_PUBLIC_API_URL="https://your-backend-url.railway.app/api"
NEXT_PUBLIC_APP_URL="https://your-frontend-url.vercel.app"
NEXT_PUBLIC_SITE_URL="https://your-frontend-url.vercel.app"
```

**Create `backend/.env.production`:**
```env
# Database (we'll get this from Neon)
DATABASE_URL="postgresql://username:password@host:5432/database"

# JWT Secrets (use the ones we generated)
JWT_SECRET="a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261"
REFRESH_TOKEN_SECRET="cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e"

# Razorpay (your production keys)
RAZORPAY_KEY_ID="your_production_razorpay_key"
RAZORPAY_KEY_SECRET="your_production_razorpay_secret"

# Email (Gmail setup)
EMAIL_FROM="noreply@grmrobotics.com"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-gmail-app-password"

# URLs (we'll update these after deployment)
FRONTEND_URL="https://your-frontend-url.vercel.app"
BACKEND_URL="https://your-backend-url.railway.app"

# Production settings
NODE_ENV=production
PORT=3001
```

### 1.2 Update API Configuration

**Update `frontend/src/lib/api.ts`:**
```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
```

## 🗄️ Step 2: Set Up FREE Database (Neon)

### 2.1 Create Neon Account
1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub (FREE)
3. Create new project: "grm-robotics"
4. Select region closest to you
5. Copy the connection string

### 2.2 Get Database URL
```
postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

## 🚀 Step 3: Deploy Backend (Railway - FREE)

### 3.1 Prepare Backend for Railway
**Create `backend/railway.json`:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start:prod",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Update `backend/package.json` scripts:**
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "start:prod": "npm run build && npm run start",
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
  }
}
```

### 3.2 Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Connect your GitHub account
5. Select your GRM Robotics repository
6. Choose "backend" folder as root directory

### 3.3 Configure Railway Environment Variables
In Railway dashboard, go to Variables tab and add:
```
DATABASE_URL=your-neon-database-url
JWT_SECRET=your-jwt-secret
REFRESH_TOKEN_SECRET=your-refresh-secret
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
EMAIL_FROM=your-email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail
EMAIL_PASS=your-gmail-app-password
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### 3.4 Run Database Migrations
In Railway dashboard:
1. Go to "Deployments" tab
2. Click on latest deployment
3. Open "Deploy Logs"
4. Once deployed, go to project settings
5. Add a new service → "Database" → "Add PostgreSQL"
6. Run migrations in the Railway console:
```bash
npx prisma migrate deploy
npx prisma db seed
```

## 🎨 Step 4: Deploy Frontend (Vercel - FREE)

### 4.1 Prepare Frontend for Vercel
**Create `frontend/vercel.json`:**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

### 4.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GRM Robotics repository
5. Set root directory to "frontend"
6. Click "Deploy"

### 4.3 Configure Vercel Environment Variables
In Vercel dashboard, go to Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
NEXT_PUBLIC_APP_URL=https://your-frontend-url.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-frontend-url.vercel.app
```

## 🔗 Step 5: Connect Frontend and Backend

### 5.1 Update Backend CORS
**Update `backend/src/server.ts`:**
```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app',
    'https://*.vercel.app' // Allow all Vercel preview deployments
  ],
  credentials: true,
}));
```

### 5.2 Update Frontend API URL
After getting your Railway backend URL, update:
**`frontend/.env.production`:**
```env
NEXT_PUBLIC_API_URL="https://your-actual-backend-url.railway.app/api"
```

## 🌐 Step 6: Get a FREE Domain (Optional)

### Option 1: Use Provided Subdomains (Easiest)
- Frontend: `your-project.vercel.app`
- Backend: `your-project.railway.app`

### Option 2: FREE Domain from Freenom
1. Go to [freenom.com](https://freenom.com)
2. Search for available domains (.tk, .ml, .ga, .cf)
3. Register for FREE (up to 12 months)
4. Point domain to Vercel in DNS settings

### Option 3: Custom Domain (If you have one)
1. In Vercel: Settings → Domains → Add domain
2. In Railway: Settings → Domains → Add domain
3. Update DNS records as instructed

## 📧 Step 7: Configure Email (Gmail)

### 7.1 Set Up Gmail App Password
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Google Account → Security → App passwords
   - Generate password for "Mail"
3. Use this in your environment variables

### 7.2 Update Email Configuration
```env
EMAIL_FROM="noreply@grmrobotics.com"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-gmail@gmail.com"
EMAIL_PASS="your-16-character-app-password"
```

## 💳 Step 8: Configure Razorpay for Production

### 8.1 Get Production Keys
1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Switch to "Live Mode"
3. Go to Settings → API Keys
4. Generate Live API Keys
5. Update environment variables

### 8.2 Update Payment Configuration
```env
RAZORPAY_KEY_ID="rzp_live_your_key_id"
RAZORPAY_KEY_SECRET="your_live_secret_key"
```

## 🧪 Step 9: Test Your Deployment

### 9.1 Test Checklist
- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Database connections work
- [ ] User registration/login
- [ ] Product browsing
- [ ] Shopping cart
- [ ] Checkout process (test mode)
- [ ] Email notifications
- [ ] Admin panel access
- [ ] Mobile responsiveness

### 9.2 Test URLs
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-project.railway.app/api/health`
- Admin Panel: `https://your-project.vercel.app/admin`

## 🔧 Step 10: Final Configuration Updates

### 10.1 Update All URLs
Once deployed, update these files with your actual URLs:

**Frontend Environment:**
```env
NEXT_PUBLIC_API_URL="https://grm-robotics-backend.railway.app/api"
NEXT_PUBLIC_APP_URL="https://grm-robotics.vercel.app"
NEXT_PUBLIC_SITE_URL="https://grm-robotics.vercel.app"
```

**Backend Environment:**
```env
FRONTEND_URL="https://grm-robotics.vercel.app"
BACKEND_URL="https://grm-robotics-backend.railway.app"
```

### 10.2 Redeploy with Updated URLs
1. Update environment variables in Vercel and Railway
2. Trigger new deployments
3. Test all functionality

## 📊 Step 11: Monitor Your Application

### 11.1 Set Up Monitoring
- **Vercel**: Built-in analytics and monitoring
- **Railway**: Built-in metrics and logs
- **Neon**: Database monitoring dashboard

### 11.2 Check Logs
- **Vercel**: Functions tab → View logs
- **Railway**: Deployments → View logs
- **Browser**: Developer tools → Console

## 🎉 Step 12: Go Live!

### 12.1 Final Checklist
- [ ] All services deployed and running
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Email sending works
- [ ] Payment processing works (test mode)
- [ ] All pages load correctly
- [ ] Mobile responsive
- [ ] Admin panel accessible

### 12.2 Launch Steps
1. **Test thoroughly** with friends/family
2. **Switch Razorpay to live mode** when ready
3. **Announce your launch** on social media
4. **Monitor for any issues**

## 💰 Cost Breakdown (FREE!)

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Vercel** | Unlimited bandwidth, 100GB/month | $0 |
| **Railway** | $5 credit monthly | $0 |
| **Neon** | 512MB database | $0 |
| **Domain** | .tk/.ml from Freenom | $0 |
| **Total** | | **$0/month** |

## 🔄 Automatic Deployments

Both Vercel and Railway will automatically redeploy when you push changes to GitHub:
- **Push to main branch** → Automatic production deployment
- **Push to other branches** → Preview deployments

## 📞 Support & Troubleshooting

### Common Issues:
1. **Build failures**: Check logs in deployment dashboard
2. **API not connecting**: Verify CORS and environment variables
3. **Database errors**: Check connection string and migrations
4. **Email not sending**: Verify Gmail app password

### Getting Help:
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Neon**: [neon.tech/docs](https://neon.tech/docs)

---

## 🎊 Congratulations!

Your GRM Robotics platform is now LIVE on the internet for FREE! 

**Your URLs:**
- **Website**: `https://your-project.vercel.app`
- **Admin**: `https://your-project.vercel.app/admin`
- **API**: `https://your-project.railway.app/api`

**You now have a professional e-commerce platform that can:**
- Handle unlimited visitors
- Process payments
- Send emails
- Manage orders
- Scale automatically

**All for FREE!** 🚀🎉