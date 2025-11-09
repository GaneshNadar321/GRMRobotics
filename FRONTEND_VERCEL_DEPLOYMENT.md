# Step-by-Step Frontend Deployment to Vercel

## Prerequisites
- ✅ GitHub account with your code
- ✅ Backend deployed on Render (get the URL)
- ✅ Vercel account (sign up at vercel.com)

## Step 1: Get Your Backend URL

First, get your backend URL from Render:
1. Go to your Render dashboard
2. Click on your backend service
3. Copy the URL (e.g., `https://grm-robotics-backend.onrender.com`)

## Step 2: Update Frontend Environment Variables

Update your frontend `.env` file with the correct backend URL:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-frontend-url.vercel.app

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Rcs02GVJSBCdpe

# OAuth Configuration (optional - currently not used)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
NEXT_PUBLIC_FACEBOOK_APP_ID=your-facebook-app-id
```

## Step 3: Create Vercel Account & Connect GitHub

### 3.1 Sign Up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub" (recommended)
4. Authorize Vercel to access your repositories

### 3.2 Import Your Project
1. **Click "New Project"** on Vercel dashboard
2. **Import Git Repository**: Find your `GaneshNadar321/GRMRobotics` repository
3. **Click "Import"** next to your repository

## Step 4: Configure Project Settings

### 4.1 Project Configuration
- **Project Name**: `grm-robotics-frontend` (or your preferred name)
- **Framework Preset**: Next.js (should auto-detect)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install`

### 4.2 Environment Variables
In the "Environment Variables" section, add these one by one:

**Required Variables:**
```
NEXT_PUBLIC_API_URL = https://your-backend-url.onrender.com/api
NEXT_PUBLIC_SITE_URL = https://your-project-name.vercel.app
NEXT_PUBLIC_RAZORPAY_KEY_ID = rzp_test_Rcs02GVJSBCdpe
```

**Optional Variables:**
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID = your-google-client-id.apps.googleusercontent.com
NEXT_PUBLIC_FACEBOOK_APP_ID = your-facebook-app-id
```

### 4.3 Advanced Settings (if needed)
- **Node.js Version**: 18.x (default is fine)
- **Build & Development Settings**: Keep defaults

## Step 5: Deploy

1. **Click "Deploy"**
2. Vercel will start building your project
3. Wait for the build to complete (2-5 minutes)
4. You'll get a deployment URL like `https://grm-robotics-frontend.vercel.app`

## Step 6: Update Backend CORS Settings

After getting your Vercel URL, update your backend environment variables:

### 6.1 Update Backend Environment on Render
1. Go to your Render backend service
2. Go to "Environment" tab
3. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL = https://your-project-name.vercel.app
   ```
4. Save changes (service will auto-redeploy)

## Step 7: Test Your Deployment

### 7.1 Basic Functionality Test
Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Product pages load
- ✅ User registration/login
- ✅ API calls to backend work

### 7.2 API Connection Test
1. Open browser developer tools (F12)
2. Go to Network tab
3. Try logging in or loading products
4. Check if API calls to your backend are successful

## Step 8: Custom Domain (Optional)

### 8.1 Add Custom Domain
1. Go to your project settings in Vercel
2. Click "Domains" tab
3. Add your custom domain (e.g., `grmrobotics.com`)
4. Follow DNS configuration instructions

### 8.2 Update Environment Variables
If you add a custom domain, update:
- `NEXT_PUBLIC_SITE_URL` in Vercel
- `FRONTEND_URL` in Render backend

## Step 9: Automatic Deployments

Vercel automatically deploys when you push to GitHub:
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from other branches/PRs

## Troubleshooting Common Issues

### Issue 1: Build Fails
**Solution**: Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors
- Verify environment variables

### Issue 2: API Calls Fail
**Solution**: Check CORS and URLs
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend `FRONTEND_URL` includes your Vercel domain
- Test API endpoints directly

### Issue 3: Environment Variables Not Working
**Solution**: 
- Ensure variables start with `NEXT_PUBLIC_`
- Redeploy after adding variables
- Check variables are set in Vercel dashboard

### Issue 4: 404 Errors on Refresh
**Solution**: Vercel handles this automatically for Next.js
- If issues persist, check `next.config.js`

## Step 10: Performance Optimization

### 10.1 Enable Analytics (Optional)
1. Go to project settings
2. Enable "Analytics" tab
3. Monitor performance metrics

### 10.2 Enable Speed Insights (Optional)
1. Install Vercel Speed Insights
2. Add to your Next.js app for performance monitoring

## Final Checklist

- [ ] Frontend deployed successfully on Vercel
- [ ] Backend CORS updated with Vercel URL
- [ ] All environment variables configured
- [ ] API calls working between frontend and backend
- [ ] User authentication working
- [ ] Product pages loading correctly
- [ ] Payment integration working (test mode)
- [ ] Custom domain configured (if applicable)

## Your URLs After Deployment

- **Frontend**: `https://your-project-name.vercel.app`
- **Backend**: `https://grm-robotics-backend.onrender.com`

## Support

If you encounter issues:
1. Check Vercel build logs
2. Test API endpoints directly
3. Verify environment variables
4. Check browser console for errors

## Next Steps After Deployment

1. Test all functionality thoroughly
2. Set up monitoring and analytics
3. Configure custom domain if needed
4. Set up production Razorpay keys
5. Configure real email service
6. Set up backup and monitoring

Your GRM Robotics application will be fully live and accessible to users! 🚀