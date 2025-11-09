# ✅ FREE Deployment Checklist - GRM Robotics

## 🎯 Complete This Checklist Step by Step

### 📋 Pre-Deployment Preparation
- [ ] Run `prepare-for-deployment.bat` script
- [ ] Read `FREE_DEPLOYMENT_GUIDE.md` completely
- [ ] Have your Razorpay production keys ready
- [ ] Set up Gmail app password for emails

### 🗄️ Step 1: Database Setup (Neon - FREE)
- [ ] Go to [neon.tech](https://neon.tech)
- [ ] Sign up with GitHub account
- [ ] Create new project: "grm-robotics"
- [ ] Copy the PostgreSQL connection string
- [ ] Save connection string for later use

### 🚀 Step 2: Backend Deployment (Railway - FREE)
- [ ] Go to [railway.app](https://railway.app)
- [ ] Sign up with GitHub account
- [ ] Click "New Project" → "Deploy from GitHub repo"
- [ ] Select your GRM Robotics repository
- [ ] Set root directory to "backend"
- [ ] Add environment variables in Railway dashboard:
  - [ ] `DATABASE_URL` (from Neon)
  - [ ] `JWT_SECRET` (from generated secrets)
  - [ ] `REFRESH_TOKEN_SECRET` (from generated secrets)
  - [ ] `RAZORPAY_KEY_ID` (your production key)
  - [ ] `RAZORPAY_KEY_SECRET` (your production secret)
  - [ ] `EMAIL_FROM` (your email address)
  - [ ] `EMAIL_HOST` (smtp.gmail.com)
  - [ ] `EMAIL_PORT` (587)
  - [ ] `EMAIL_USER` (your Gmail address)
  - [ ] `EMAIL_PASS` (your Gmail app password)
  - [ ] `NODE_ENV` (production)
  - [ ] `PORT` (3001)
- [ ] Wait for deployment to complete
- [ ] Copy your Railway backend URL (e.g., `https://xxx.railway.app`)
- [ ] Test backend: Visit `https://your-backend-url.railway.app/api/health`

### 🎨 Step 3: Frontend Deployment (Vercel - FREE)
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign up with GitHub account
- [ ] Click "New Project"
- [ ] Import your GRM Robotics repository
- [ ] Set root directory to "frontend"
- [ ] Add environment variables in Vercel dashboard:
  - [ ] `NEXT_PUBLIC_API_URL` (https://your-backend-url.railway.app/api)
  - [ ] `NEXT_PUBLIC_APP_URL` (https://your-frontend-url.vercel.app)
  - [ ] `NEXT_PUBLIC_SITE_URL` (https://your-frontend-url.vercel.app)
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Copy your Vercel frontend URL (e.g., `https://xxx.vercel.app`)

### 🔗 Step 4: Connect Frontend and Backend
- [ ] Update Railway environment variables:
  - [ ] `FRONTEND_URL` (your Vercel URL)
  - [ ] `BACKEND_URL` (your Railway URL)
- [ ] Update Vercel environment variables with actual URLs
- [ ] Redeploy both services
- [ ] Test connection: Frontend should load and connect to backend

### 🗃️ Step 5: Database Setup
- [ ] In Railway dashboard, open your backend deployment
- [ ] Go to "Deployments" → Click latest deployment
- [ ] Open terminal/console
- [ ] Run database migrations:
  ```bash
  npx prisma migrate deploy
  npx prisma db seed
  ```
- [ ] Verify database has tables and initial data

### 📧 Step 6: Email Configuration
- [ ] Enable 2-Factor Authentication on Gmail
- [ ] Generate Gmail App Password:
  - [ ] Go to Google Account → Security → App passwords
  - [ ] Generate password for "Mail"
  - [ ] Copy 16-character password
- [ ] Update Railway environment variable `EMAIL_PASS` with app password
- [ ] Test email: Use the test script in backend

### 💳 Step 7: Payment Configuration
- [ ] Log in to Razorpay Dashboard
- [ ] Switch to "Live Mode"
- [ ] Go to Settings → API Keys
- [ ] Generate Live API Keys
- [ ] Update Railway environment variables:
  - [ ] `RAZORPAY_KEY_ID` (live key)
  - [ ] `RAZORPAY_KEY_SECRET` (live secret)
- [ ] Test payment flow (use test cards first)

### 🧪 Step 8: Testing Your Live Site
- [ ] **Frontend Tests:**
  - [ ] Homepage loads correctly
  - [ ] Product pages display properly
  - [ ] User registration works
  - [ ] User login works
  - [ ] Shopping cart functions
  - [ ] Checkout process works
  - [ ] Mobile responsive design
- [ ] **Backend Tests:**
  - [ ] API health check: `/api/health`
  - [ ] User authentication
  - [ ] Product data loading
  - [ ] Order creation
  - [ ] Email notifications
- [ ] **Admin Panel Tests:**
  - [ ] Admin login works
  - [ ] Product management
  - [ ] Order management
  - [ ] User management
  - [ ] Analytics dashboard

### 🌐 Step 9: Domain Setup (Optional)
- [ ] **Option A: Use Free Subdomains**
  - [ ] Frontend: `your-project.vercel.app`
  - [ ] Backend: `your-project.railway.app`
- [ ] **Option B: Free Domain from Freenom**
  - [ ] Go to [freenom.com](https://freenom.com)
  - [ ] Register free domain (.tk, .ml, .ga, .cf)
  - [ ] Configure DNS in Vercel/Railway
- [ ] **Option C: Custom Domain (If you own one)**
  - [ ] Add domain in Vercel dashboard
  - [ ] Add domain in Railway dashboard
  - [ ] Update DNS records

### 📊 Step 10: Final Configuration
- [ ] Update all environment variables with final URLs
- [ ] Update CORS settings in backend for production domain
- [ ] Test all functionality end-to-end
- [ ] Verify SSL certificates are working (https://)
- [ ] Check mobile responsiveness
- [ ] Test payment processing (small test transaction)

### 🎉 Step 11: Go Live!
- [ ] **Final Testing:**
  - [ ] Complete a test purchase
  - [ ] Verify order confirmation email
  - [ ] Check admin panel shows the order
  - [ ] Test customer support contact form
- [ ] **Launch Preparation:**
  - [ ] Create admin user account
  - [ ] Add your products and inventory
  - [ ] Set up your business information
  - [ ] Configure shipping rates
  - [ ] Set up tax settings
- [ ] **Announce Your Launch:**
  - [ ] Share on social media
  - [ ] Tell friends and family
  - [ ] Start marketing your robotics products!

## 🔧 Troubleshooting Common Issues

### ❌ Build Failures
- Check deployment logs in Railway/Vercel dashboard
- Verify all environment variables are set
- Ensure package.json scripts are correct

### ❌ API Connection Issues
- Verify CORS settings in backend
- Check environment variable URLs
- Test API endpoints directly

### ❌ Database Connection Issues
- Verify DATABASE_URL is correct
- Check Neon database is running
- Ensure migrations were applied

### ❌ Email Not Sending
- Verify Gmail app password is correct
- Check 2FA is enabled on Gmail
- Test email configuration

### ❌ Payment Issues
- Verify Razorpay keys are correct
- Check if in live mode vs test mode
- Verify webhook URLs if using them

## 📞 Getting Help

### Documentation Links:
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Neon**: [neon.tech/docs](https://neon.tech/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)

### Support Communities:
- **Vercel Discord**: [vercel.com/discord](https://vercel.com/discord)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **Stack Overflow**: Tag your questions with relevant technologies

## 🎊 Success! Your URLs

Once completed, you'll have:

- **🌐 Website**: `https://your-project.vercel.app`
- **👨‍💼 Admin Panel**: `https://your-project.vercel.app/admin`
- **🔧 API**: `https://your-project.railway.app/api`
- **📊 Database**: Managed by Neon
- **📧 Emails**: Sent via Gmail
- **💳 Payments**: Processed by Razorpay

**Total Cost: $0/month** 🎉

Your GRM Robotics e-commerce platform is now live and ready to serve customers worldwide!