# 🚂 Railway.app Backend Deployment - Step by Step

## 🎯 What is Railway?
Railway is a modern cloud platform that makes it easy to deploy and manage applications. It offers a generous free tier perfect for hosting your GRM Robotics backend API.

**Free Tier Includes:**
- $5 monthly credit (enough for small to medium apps)
- Automatic deployments from Git
- Built-in databases (PostgreSQL, MySQL, Redis)
- Custom domains
- SSL certificates
- Environment variables management

## 📋 Step-by-Step Railway Setup

### Step 1: Create Railway Account
1. **Go to Railway Website**
   - Open your browser
   - Navigate to: [https://railway.app](https://railway.app)

2. **Sign Up**
   - Click **"Login"** button (top right)
   - Choose **"Login with GitHub"** (recommended)
   - This connects your GitHub repositories for easy deployment

3. **Authorize Railway**
   - Click **"Authorize Railway"** when prompted
   - Grant access to your repositories
   - You can limit access to specific repositories if preferred

### Step 2: Create New Project
1. **New Project**
   - After login, click **"New Project"** button
   - You'll see several options for creating projects

2. **Deploy from GitHub**
   - Click **"Deploy from GitHub repo"**
   - You'll see a list of your GitHub repositories
   - Find your **"GRM Website"** repository
   - Click on it to select

3. **Configure Deployment**
   - Railway will analyze your repository
   - It should detect multiple folders (frontend, backend)
   - You need to deploy the **backend** folder

### Step 3: Configure Backend Deployment
1. **Set Root Directory**
   - In the deployment configuration
   - Look for **"Root Directory"** or **"Source"** setting
   - Set it to: **`backend`**
   - This tells Railway to deploy only the backend folder

2. **Build Configuration**
   - **Build Command**: `npm run build` (should auto-detect)
   - **Start Command**: `npm run start:prod`
   - **Install Command**: `npm install` (should auto-detect)

3. **Runtime Settings**
   - **Runtime**: Node.js (should auto-detect)
   - **Node Version**: 18.x or latest
   - **Package Manager**: npm (should auto-detect)

### Step 4: Configure Environment Variables
1. **Access Variables Tab**
   - After project creation, go to your project dashboard
   - Click on the **"Variables"** tab
   - This is where you'll add all your environment variables

2. **Add Database URL**
   ```
   Variable Name: DATABASE_URL
   Value: postgresql://username:password@host:5432/database?sslmode=require
   ```
   (Use the connection string from your Neon database)

3. **Add JWT Secrets**
   ```
   Variable Name: JWT_SECRET
   Value: a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261

   Variable Name: REFRESH_TOKEN_SECRET
   Value: cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e
   ```

4. **Add Razorpay Configuration**
   ```
   Variable Name: RAZORPAY_KEY_ID
   Value: rzp_live_your_actual_key_id

   Variable Name: RAZORPAY_KEY_SECRET
   Value: your_actual_secret_key
   ```

5. **Add Email Configuration**
   ```
   Variable Name: EMAIL_FROM
   Value: noreply@grmrobotics.com

   Variable Name: EMAIL_HOST
   Value: smtp.gmail.com

   Variable Name: EMAIL_PORT
   Value: 587

   Variable Name: EMAIL_USER
   Value: your-gmail@gmail.com

   Variable Name: EMAIL_PASS
   Value: your-gmail-app-password
   ```

6. **Add Application URLs**
   ```
   Variable Name: FRONTEND_URL
   Value: https://grmrobotics.com

   Variable Name: BACKEND_URL
   Value: https://grm-robotics-backend.railway.app
   ```
   (Update these with your actual URLs after deployment)

7. **Add Production Settings**
   ```
   Variable Name: NODE_ENV
   Value: production

   Variable Name: PORT
   Value: 3001
   ```

### Step 5: Deploy Your Backend
1. **Trigger Deployment**
   - After adding environment variables
   - Go to **"Deployments"** tab
   - Click **"Deploy"** or it may auto-deploy
   - Watch the build logs in real-time

2. **Monitor Build Process**
   - You'll see logs showing:
     - Installing dependencies
     - Building TypeScript
     - Starting the application
   - Build should complete in 2-5 minutes

3. **Get Your Backend URL**
   - After successful deployment
   - Go to **"Settings"** tab
   - Look for **"Domains"** section
   - You'll see a URL like: `https://grm-robotics-backend.railway.app`
   web-production-aac1.up.railway.app
   - Copy this URL for later use

### Step 6: Set Up Custom Domain (Optional)
1. **Add Custom Domain**
   - In **"Settings"** → **"Domains"**
   - Click **"Custom Domain"**
   - Enter your domain: `api.grmrobotics.com`
   - Click **"Add Domain"**

2. **Configure DNS**
   - Railway will show DNS records to add
   - Go to your domain registrar
   - Add CNAME record:
   ```
   Type: CNAME
   Name: api
   Value: grm-robotics-backend.railway.app
   ```

3. **SSL Certificate**
   - Railway automatically provides SSL
   - Your API will be accessible via HTTPS

### Step 7: Database Migration
1. **Access Railway Console**
   - Go to your project dashboard
   - Look for **"Console"** or **"Terminal"** option
   - This gives you command-line access to your deployed app

2. **Run Database Migrations**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Apply database migrations
   npx prisma migrate deploy

   # Seed initial data
   npx prisma db seed
   ```

3. **Verify Database**
   ```bash
   # Check database connection
   npx prisma studio --browser none

   # Or run a simple query
   node -e "
   const { PrismaClient } = require('@prisma/client');
   const prisma = new PrismaClient();
   prisma.user.count().then(count => console.log('Users:', count));
   "
   ```

### Step 8: Configure Monitoring and Logs
1. **View Application Logs**
   - Go to **"Deployments"** tab
   - Click on latest deployment
   - View real-time logs
   - Monitor for errors or issues

2. **Metrics Dashboard**
   - Go to **"Metrics"** tab
   - View CPU, memory, and network usage
   - Monitor response times
   - Track error rates

3. **Set Up Alerts** (Optional)
   - Configure notifications for:
     - Deployment failures
     - High error rates
     - Resource usage spikes

### Step 9: Test Your Backend API
1. **Health Check**
   - Visit: `https://your-backend-url.railway.app/api/health`
   - Should return JSON with status information

2. **API Endpoints**
   - Test key endpoints:
   ```
   GET /api/products - List products
   GET /api/categories - List categories
   POST /api/auth/register - User registration
   POST /api/auth/login - User login
   ```

3. **Database Connection**
   - Verify database queries work
   - Check if seed data was created
   - Test CRUD operations

## 🔧 Advanced Configuration

### Scaling Settings:
1. **Resource Allocation**
   - Go to **"Settings"** → **"Resources"**
   - **Memory**: 512MB (sufficient for free tier)
   - **CPU**: Shared (included in free tier)

2. **Auto-scaling**
   - Railway automatically scales based on demand
   - No configuration needed for basic usage

### Security Configuration:
1. **Environment Variables**
   - All variables are encrypted at rest
   - Only accessible to your application
   - Never logged or exposed

2. **Network Security**
   - HTTPS enforced by default
   - Railway provides DDoS protection
   - Automatic security updates

### Backup and Recovery:
1. **Database Backups**
   - Use your Neon database backups
   - Railway doesn't backup external databases
   - Consider additional backup strategies for production

2. **Code Backups**
   - Your code is in GitHub (already backed up)
   - Railway deployments are versioned
   - Easy rollback to previous versions

## 🧪 Testing Your Deployment

### API Testing:
1. **Use Postman or curl**
   ```bash
   # Test health endpoint
   curl https://your-backend-url.railway.app/api/health

   # Test products endpoint
   curl https://your-backend-url.railway.app/api/products

   # Test with authentication
   curl -H "Authorization: Bearer your-jwt-token" \
        https://your-backend-url.railway.app/api/admin/dashboard
   ```

2. **Frontend Integration**
   - Update frontend environment variables
   - Test API calls from your website
   - Verify CORS settings work

## 📝 Important Information to Save

After deployment, save these details:

```
Backend URL: https://grm-robotics-backend.railway.app
API Base URL: https://grm-robotics-backend.railway.app/api
Railway Dashboard: https://railway.app/dashboard
Project Settings: https://railway.app/project/your-project-id
```

## 🔧 Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check **"Deployments"** logs for errors
   - Verify `package.json` scripts are correct
   - Ensure all dependencies are listed

2. **Environment Variable Issues**
   - Double-check variable names (case-sensitive)
   - Verify values don't have extra spaces
   - Redeploy after changing variables

3. **Database Connection Errors**
   - Verify `DATABASE_URL` is correct
   - Check Neon database is running
   - Ensure SSL mode is enabled

4. **API Not Responding**
   - Check application logs for errors
   - Verify PORT environment variable
   - Test health endpoint first

5. **CORS Issues**
   - Update CORS settings in your backend code
   - Add your frontend domain to allowed origins
   - Redeploy after CORS changes

### Getting Help:
- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **Support**: [railway.app/help](https://railway.app/help)

## 📊 Free Tier Usage

**Monitor Your Usage:**
- Go to **"Usage"** tab in Railway dashboard
- Track monthly credit consumption
- $5 credit typically covers:
  - Small to medium traffic
  - 24/7 uptime
  - Basic compute resources

**Optimize Usage:**
- Use efficient database queries
- Implement caching where possible
- Monitor resource consumption
- Scale up when needed

## 🎉 Success Checklist

Your Railway backend is ready when:
- [ ] Project deployed successfully
- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] Health endpoint responding
- [ ] API endpoints working
- [ ] CORS configured for frontend
- [ ] SSL certificate active
- [ ] Monitoring set up

## 🔄 Automatic Deployments

Railway automatically deploys when:
- ✅ You push to your main branch
- ✅ Environment variables change
- ✅ Manual deployment triggered

**Deployment Process:**
1. Code pushed to GitHub
2. Railway detects changes
3. Builds new version
4. Runs tests (if configured)
5. Deploys to production
6. Health checks pass
7. Traffic routed to new version

## 📈 Monitoring and Maintenance

### Regular Checks:
- [ ] Monitor application logs daily
- [ ] Check error rates and response times
- [ ] Verify database performance
- [ ] Monitor resource usage
- [ ] Update dependencies regularly

### Performance Optimization:
- [ ] Implement database indexing
- [ ] Add response caching
- [ ] Optimize API queries
- [ ] Monitor and fix slow endpoints
- [ ] Use connection pooling

Your GRM Robotics backend is now live and ready to serve your customers! 🚀

## 🔗 Integration with Frontend

After Railway deployment:
1. **Update Frontend Environment Variables**
   ```env
   NEXT_PUBLIC_API_URL=https://grm-robotics-backend.railway.app/api
   ```

2. **Update Backend CORS Settings**
   ```javascript
   app.use(cors({
     origin: [
       'https://grmrobotics.com',
       'https://www.grmrobotics.com',
       'https://*.vercel.app'
     ],
     credentials: true,
   }));
   ```

3. **Test End-to-End**
   - User registration/login
   - Product browsing
   - Shopping cart
   - Checkout process
   - Admin panel access

Your backend is now powering your live e-commerce platform! 🎊