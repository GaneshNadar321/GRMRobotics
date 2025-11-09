# Vercel Quick Setup Reference

## 🚀 Quick Deployment Steps

### 1. Go to Vercel
- Visit [vercel.com](https://vercel.com)
- Sign up with GitHub

### 2. Import Project
- Click "New Project"
- Select `GaneshNadar321/GRMRobotics`
- Set **Root Directory**: `frontend`

### 3. Environment Variables
Add these in Vercel dashboard:

```
NEXT_PUBLIC_API_URL = https://grm-robotics-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL = https://your-project-name.vercel.app
NEXT_PUBLIC_RAZORPAY_KEY_ID = rzp_test_Rcs02GVJSBCdpe
```

### 4. Deploy
- Click "Deploy"
- Wait for build completion
- Get your Vercel URL

### 5. Update Backend
In Render backend, update:
```
FRONTEND_URL = https://your-project-name.vercel.app
```

## ✅ That's it! Your app is live!

## 🔗 Important URLs
- **Your Frontend**: `https://your-project-name.vercel.app`
- **Your Backend**: `https://grm-robotics-backend.onrender.com`

## 🛠️ If Something Goes Wrong
1. Check Vercel build logs
2. Verify environment variables
3. Test backend API directly
4. Check browser console for errors