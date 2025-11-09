# 🚀 Deploy to Production - Quick Guide

## 🎯 Your Domain: grmrobotics.com

---

## ⚡ FASTEST DEPLOYMENT (Recommended)

### Using Vercel + Railway (15 minutes)

This is the **easiest and fastest** way to get your site live!

---

## 📋 STEP-BY-STEP GUIDE

### STEP 1: Deploy Backend to Railway (5 minutes)

1. **Go to Railway:**
   ```
   https://railway.app
   Sign up with GitHub
   ```

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your backend folder

3. **Add PostgreSQL Database:**
   - Click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway creates it automatically!

4. **Set Environment Variables:**
   - Click on your backend service
   - Go to "Variables" tab
   - Click "Raw Editor"
   - Paste this (update the values):

   ```env
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars
   FRONTEND_URL=https://grmrobotics.com
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

5. **Deploy:**
   - Railway automatically builds and deploys
   - Wait 2-3 minutes
   - Copy your backend URL (e.g., `https://your-app.railway.app`)

6. **Run Database Migration:**
   - In Railway, go to your backend service
   - Click "Settings" → "Deploy"
   - Under "Start Command", add:
     ```
     npx prisma migrate deploy && npm start
     ```
   - Redeploy

✅ **Backend is now live!**

---

### STEP 2: Deploy Frontend to Vercel (5 minutes)

1. **Go to Vercel:**
   ```
   https://vercel.com
   Sign up with GitHub
   ```

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import your frontend repository
   - Select the `frontend` folder

3. **Configure:**
   - Framework: Next.js (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Set Environment Variables:**
   - Click "Environment Variables"
   - Add these:

   ```env
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Vercel gives you a URL

✅ **Frontend is now live!**

---

### STEP 3: Connect Your Domain (5 minutes)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add domain: `grmrobotics.com`
   - Add domain: `www.grmrobotics.com`

2. **Configure DNS:**
   - Vercel shows you DNS records to add
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add the DNS records Vercel provides

   **Typical records:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS Propagation:**
   - Usually takes 5-30 minutes
   - Can take up to 48 hours
   - Check status in Vercel dashboard

✅ **Domain is now connected!**

---

## 🔐 SECURITY SETUP

### Generate Secure Secrets:

**On your computer, run:**
```bash
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate Refresh Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy these and use them in your Railway environment variables!

---

## 💳 RAZORPAY LIVE MODE

### Switch to Production:

1. **Go to Razorpay Dashboard:**
   ```
   https://dashboard.razorpay.com
   ```

2. **Switch to Live Mode:**
   - Toggle from "Test Mode" to "Live Mode" (top right)

3. **Generate Live API Keys:**
   - Go to Settings → API Keys
   - Click "Generate Live Keys"
   - Copy Key ID and Key Secret

4. **Update Environment Variables:**
   - Railway: Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
   - Vercel: Update `NEXT_PUBLIC_RAZORPAY_KEY_ID`

5. **Configure Webhook:**
   - Settings → Webhooks
   - Webhook URL: `https://your-backend.railway.app/api/webhooks/razorpay`
   - Active Events: `payment.captured`, `payment.failed`
   - Generate and save webhook secret

---

## 📧 EMAIL SETUP (Gmail)

### Quick Setup:

1. **Enable 2FA on Gmail:**
   - Go to Google Account → Security
   - Enable 2-Step Verification

2. **Create App Password:**
   - Google Account → Security → 2-Step Verification
   - Scroll to "App passwords"
   - Select "Mail" and "Other"
   - Name it "GRM Robotics"
   - Copy the 16-character password

3. **Update Railway Environment:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx (16 chars)
   ```

---

## ✅ PRE-LAUNCH CHECKLIST

Before announcing your site:

### Backend:
- [ ] Railway deployment successful
- [ ] Database connected
- [ ] Environment variables set
- [ ] API responding (test: `https://your-backend.railway.app/health`)
- [ ] Database migrated

### Frontend:
- [ ] Vercel deployment successful
- [ ] Environment variables set
- [ ] Site loads correctly
- [ ] API connection working

### Domain:
- [ ] DNS configured
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Both www and non-www working
- [ ] Redirects working

### Payment:
- [ ] Razorpay in live mode
- [ ] Live API keys configured
- [ ] Webhook configured
- [ ] Test payment (small amount)

### Email:
- [ ] SMTP configured
- [ ] Test email sent
- [ ] Check spam folder

### Testing:
- [ ] Homepage loads
- [ ] Products page works
- [ ] Search works
- [ ] Cart works
- [ ] Checkout works
- [ ] Payment works
- [ ] Order confirmation email received
- [ ] Admin panel accessible
- [ ] Mobile responsive

---

## 🧪 TESTING GUIDE

### Test Complete User Flow:

1. **Browse Products:**
   ```
   Go to https://grmrobotics.com
   Click on Products
   View product details
   ```

2. **Add to Cart:**
   ```
   Click "Add to Cart"
   View cart
   Update quantities
   ```

3. **Checkout:**
   ```
   Click "Checkout"
   Fill shipping address
   Proceed to payment
   ```

4. **Payment (Test with ₹1):**
   ```
   Use Razorpay test card:
   Card: 4111 1111 1111 1111
   CVV: Any 3 digits
   Expiry: Any future date
   ```

5. **Verify:**
   ```
   Check order confirmation email
   Check order in admin panel
   Verify payment in Razorpay dashboard
   ```

---

## 🚨 TROUBLESHOOTING

### Site Not Loading:
```
1. Check DNS propagation: https://dnschecker.org
2. Verify Vercel deployment status
3. Check browser console for errors
```

### API Errors:
```
1. Check Railway logs
2. Verify environment variables
3. Test API directly: https://your-backend.railway.app/health
4. Check CORS settings
```

### Payment Not Working:
```
1. Verify Razorpay is in Live Mode
2. Check API keys are correct
3. Verify webhook is configured
4. Check Railway logs for errors
```

### Email Not Sending:
```
1. Verify SMTP credentials
2. Check app password is correct
3. Test with a simple email first
4. Check spam folder
```

---

## 📊 MONITORING

### After Launch:

1. **Check Railway Logs:**
   ```
   Railway Dashboard → Your Service → Logs
   Monitor for errors
   ```

2. **Check Vercel Analytics:**
   ```
   Vercel Dashboard → Your Project → Analytics
   See visitor stats
   ```

3. **Monitor Razorpay:**
   ```
   Razorpay Dashboard → Payments
   Track transactions
   ```

---

## 💰 COSTS

### Expected Monthly Costs:

**Minimal Setup:**
- Domain: ~$1/month ($12/year)
- Railway: $5-10/month (includes database)
- Vercel: Free
- **Total: ~$6-11/month**

**As You Grow:**
- Railway: $10-20/month
- Email (SendGrid): $0-10/month
- **Total: ~$11-31/month**

---

## 🎉 LAUNCH!

### When Everything is Ready:

1. **Final Check:**
   - Test complete user flow
   - Verify all features work
   - Check mobile responsiveness

2. **Go Live:**
   - Announce on social media
   - Email your contacts
   - Share with friends

3. **Monitor:**
   - Watch for errors
   - Check analytics
   - Respond to feedback

---

## 📞 NEED HELP?

### Support Resources:

**Vercel:**
- Docs: https://vercel.com/docs
- Support: support@vercel.com

**Railway:**
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway

**Razorpay:**
- Docs: https://razorpay.com/docs
- Support: support@razorpay.com

**Me:**
- I'm here to help! Just ask! 😊

---

## 🚀 READY?

### Quick Summary:

1. ✅ Deploy backend to Railway (5 min)
2. ✅ Deploy frontend to Vercel (5 min)
3. ✅ Connect domain (5 min)
4. ✅ Configure Razorpay live mode
5. ✅ Set up email
6. ✅ Test everything
7. ✅ Launch! 🎉

**Total Time: ~30 minutes to 1 hour**

---

**Your website is ready to go live on grmrobotics.com!** 🚀

**Let me know when you're ready to start, and I'll guide you through each step!** 💪
