# Step-by-Step Backend Deployment to Render

## Prerequisites
- ✅ GitHub account
- ✅ Render account (sign up at render.com)
- ✅ Your code ready to push to GitHub

## Step 1: Prepare Your Code for GitHub

### 1.1 Create .gitignore (if not exists)
Create a `.gitignore` file in your project root:
```
node_modules/
.env
.env.local
.env.production
dist/
build/
*.log
.DS_Store
uploads/
```

### 1.2 Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - GRM Robotics backend"
git branch -M main
git remote add origin https://github.com/yourusername/grm-robotics.git
git push -u origin main
```

## Step 2: Deploy Backend on Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Authorize Render to access your repositories

### 2.2 Create New Web Service
1. **Go to Render Dashboard**
   - Click "New +" button
   - Select "Web Service"

2. **Connect Repository**
   - Choose "Build and deploy from a Git repository"
   - Click "Connect" next to your repository
   - If you don't see it, click "Configure account" to grant access

3. **Configure Service Settings**
   - **Name**: `grm-robotics-backend`
   - **Region**: Choose closest to your users (e.g., Singapore for Asia)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: 
     ```
     npm install && npm run build && npm run prisma:generate
     ```
   - **Start Command**: 
     ```
     npm run start
     ```

### 2.3 Add Environment Variables
In the "Environment Variables" section, add these one by one:

**Database & JWT:**
```
DATABASE_URL = postgresql://neondb_owner:npg_8JpeoAblRS4W@ep-twilight-resonance-a1sqm9xo-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

JWT_SECRET = a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261

JWT_EXPIRES_IN = 365d

REFRESH_TOKEN_SECRET = cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e

REFRESH_TOKEN_EXPIRES_IN = 365d
```

**Payment (Razorpay):**
```
RAZORPAY_KEY_ID = rzp_test_Rcs02GVJSBCdpe

RAZORPAY_KEY_SECRET = HOgOaN1NMTivnmRUDL0lgct2

RAZORPAY_WEBHOOK_SECRET = your_webhook_secret
```

**Email Configuration:**
```
EMAIL_FROM = noreply@grmrobotics.com

EMAIL_HOST = smtp.example.com

EMAIL_PORT = 587

EMAIL_USER = infogrmrobotics@gmail.com

EMAIL_PASS = djwy qlvu sndn wzpw

SMTP_HOST = smtp.gmail.com

SMTP_PORT = 587

SMTP_USER = infogrmrobotics@gmail.com

SMTP_PASS = djwy qlvu sndn wzpw
```

**Server Configuration:**
```
STORAGE_TYPE = local

UPLOAD_DIR = ./uploads

PORT = 10000

NODE_ENV = production

FRONTEND_URL = https://localhost:3000

BCRYPT_ROUNDS = 10

RATE_LIMIT_WINDOW_MS = 900000

RATE_LIMIT_MAX_REQUESTS = 100
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Render will start building your application
3. Wait for the build to complete (5-10 minutes)

## Step 3: Verify Deployment

### 3.1 Check Build Logs
1. Go to your service dashboard
2. Click on "Logs" tab
3. Look for successful build messages:
   ```
   ✓ Build completed successfully
   ✓ Prisma generated
   ✓ Server starting on port 10000
   ```

### 3.2 Test Your API
Your backend will be available at: `https://grm-robotics-backend.onrender.com`

Test these endpoints:
```bash
# Health check
curl https://grm-robotics-backend.onrender.com/api/health

# Get products
curl https://grm-robotics-backend.onrender.com/api/products
```

## Step 4: Common Issues & Solutions

### 4.1 Build Failures

**Issue**: `npm install` fails
**Solution**: 
- Check your `package.json` is in the `backend` folder
- Ensure all dependencies are listed

**Issue**: Prisma generate fails
**Solution**:
- Make sure `prisma` is in dependencies, not devDependencies
- Check your `schema.prisma` file exists

### 4.2 Database Connection Issues

**Issue**: Database connection fails
**Solution**:
- Verify your Neon database URL is correct
- Check if Neon database is active
- Ensure SSL mode is configured

### 4.3 Environment Variable Issues

**Issue**: Missing environment variables
**Solution**:
- Double-check all variables are added in Render dashboard
- Ensure no typos in variable names
- Restart the service after adding variables

## Step 5: Update Frontend URL (After Frontend Deployment)

Once you deploy your frontend, update the `FRONTEND_URL` environment variable:

1. Go to your backend service in Render
2. Go to "Environment" tab
3. Update `FRONTEND_URL` to your frontend URL
4. The service will automatically redeploy

## Step 6: Monitor Your Service

### 6.1 Service Dashboard
- Monitor CPU and memory usage
- Check response times
- View error logs

### 6.2 Free Tier Limitations
- Service sleeps after 15 minutes of inactivity
- 750 hours/month limit
- First request after sleep takes 30+ seconds

## Next Steps

1. ✅ Backend deployed
2. 🔄 Deploy frontend (separate guide)
3. 🔄 Update CORS settings
4. 🔄 Test full application
5. 🔄 Set up custom domain (optional)

## Your Backend URL
After successful deployment, your backend will be available at:
`https://grm-robotics-backend.onrender.com`

Save this URL - you'll need it for frontend configuration!

## Support
If you encounter issues:
1. Check the "Logs" tab in Render dashboard
2. Verify all environment variables
3. Test database connection
4. Check GitHub repository access

Remember: The first deployment might take longer. Subsequent deployments will be faster!