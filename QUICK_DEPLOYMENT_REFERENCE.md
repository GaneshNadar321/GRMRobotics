# 🚀 Quick Deployment Reference - GRM Robotics

## 🎯 FREE Services We're Using

| Service | Purpose | URL | Cost |
|---------|---------|-----|------|
| **Neon** | PostgreSQL Database | [neon.tech](https://neon.tech) | FREE |
| **Railway** | Backend Hosting | [railway.app](https://railway.app) | FREE |
| **Vercel** | Frontend Hosting | [vercel.com](https://vercel.com) | FREE |
| **Freenom** | Free Domain (Optional) | [freenom.com](https://freenom.com) | FREE |

## 📋 Quick Setup Steps

### 1️⃣ Prepare Your Code
```bash
# Run this script to prepare all files
prepare-for-deployment.bat
```

### 2️⃣ Database (Neon)
1. Sign up at [neon.tech](https://neon.tech)
2. Create project: "grm-robotics"
3. Copy connection string

### 3️⃣ Backend (Railway)
1. Sign up at [railway.app](https://railway.app)
2. Deploy from GitHub → Select "backend" folder
3. Add environment variables (see checklist)

### 4️⃣ Frontend (Vercel)
1. Sign up at [vercel.com](https://vercel.com)
2. Deploy from GitHub → Select "frontend" folder
3. Add environment variables (see checklist)

## 🔧 Environment Variables Quick Reference

### Railway (Backend) Variables:
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-generated-jwt-secret
REFRESH_TOKEN_SECRET=your-generated-refresh-secret
RAZORPAY_KEY_ID=rzp_live_your_key
RAZORPAY_KEY_SECRET=your_secret_key
EMAIL_FROM=noreply@grmrobotics.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-project.vercel.app
BACKEND_URL=https://your-project.railway.app
```

### Vercel (Frontend) Variables:
```env
NEXT_PUBLIC_API_URL=https://your-project.railway.app/api
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

## 🧪 Testing URLs

After deployment, test these URLs:

| Test | URL | Expected Result |
|------|-----|-----------------|
| **Frontend** | `https://your-project.vercel.app` | Homepage loads |
| **API Health** | `https://your-project.railway.app/api/health` | JSON response |
| **Admin Panel** | `https://your-project.vercel.app/admin` | Admin login page |
| **Products** | `https://your-project.vercel.app/products` | Product listing |

## 🔑 Important Credentials

### JWT Secrets (Generated):
```
JWT_SECRET="a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261"

REFRESH_TOKEN_SECRET="cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e"
```

### Razorpay Keys:
- Get from: [dashboard.razorpay.com](https://dashboard.razorpay.com)
- Switch to "Live Mode" for production
- Settings → API Keys

### Gmail App Password:
- Enable 2FA: [myaccount.google.com/security](https://myaccount.google.com/security)
- Generate App Password: Security → App passwords
- Use 16-character password in EMAIL_PASS

## 🚨 Common Issues & Quick Fixes

### ❌ "Build Failed"
- Check deployment logs
- Verify package.json scripts
- Ensure all dependencies are installed

### ❌ "API Not Connecting"
- Check CORS settings in backend
- Verify environment variable URLs
- Test API endpoint directly

### ❌ "Database Error"
- Verify DATABASE_URL format
- Check Neon database is active
- Run migrations: `npx prisma migrate deploy`

### ❌ "Email Not Sending"
- Verify Gmail app password
- Check 2FA is enabled
- Test email configuration

## 📱 Mobile Testing

Test these on mobile devices:
- [ ] Homepage responsive
- [ ] Product browsing
- [ ] Shopping cart
- [ ] Checkout process
- [ ] User registration/login
- [ ] Admin panel (tablet)

## 🎯 Performance Checklist

- [ ] Page load time < 3 seconds
- [ ] Images optimized and loading
- [ ] API responses < 500ms
- [ ] Mobile responsive design
- [ ] SSL certificate active (https://)

## 🔄 Automatic Deployments

Both services auto-deploy when you push to GitHub:
- **Push to main** → Production deployment
- **Push to other branches** → Preview deployments

## 📊 Monitoring Your Site

### Vercel Analytics:
- Built-in performance monitoring
- Real user metrics
- Error tracking

### Railway Metrics:
- CPU and memory usage
- Request logs
- Deployment history

### Neon Database:
- Connection monitoring
- Query performance
- Storage usage

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Frontend loads without errors
- ✅ API health check returns 200 OK
- ✅ Database connections work
- ✅ User can register/login
- ✅ Products display correctly
- ✅ Checkout process works
- ✅ Emails are sent
- ✅ Admin panel accessible
- ✅ Mobile responsive

## 📞 Emergency Contacts

### Service Status Pages:
- **Vercel**: [vercel-status.com](https://vercel-status.com)
- **Railway**: [status.railway.app](https://status.railway.app)
- **Neon**: [status.neon.tech](https://status.neon.tech)

### Documentation:
- **Complete Guide**: `FREE_DEPLOYMENT_GUIDE.md`
- **Detailed Checklist**: `DEPLOYMENT_CHECKLIST.md`
- **Email Setup**: `EMAIL_SETUP_GUIDE.md`
- **JWT Secrets**: `JWT_SECRET_GENERATION_GUIDE.md`

---

## 🎊 Your Live URLs (Update After Deployment)

```
🌐 Website: https://your-project.vercel.app
👨‍💼 Admin: https://your-project.vercel.app/admin
🔧 API: https://your-project.railway.app/api
📊 Database: [Neon Dashboard]
```

**Total Monthly Cost: $0** 🎉

**Your GRM Robotics platform is now live and ready for customers!**