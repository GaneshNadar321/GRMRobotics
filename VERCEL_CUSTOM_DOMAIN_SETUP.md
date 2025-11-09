# 🌐 Vercel Deployment with Custom Domain - Step by Step

## 🎯 What is Vercel?
Vercel is a cloud platform for static sites and serverless functions. It's perfect for hosting your Next.js frontend with excellent performance and free SSL certificates.

**Free Tier Includes:**
- Unlimited bandwidth
- 100GB-hrs of serverless function execution
- Automatic SSL certificates
- Global CDN
- Custom domains
- Automatic deployments from Git

## 📋 Step-by-Step Vercel Setup

### Step 1: Create Vercel Account
1. **Go to Vercel Website**
   - Open your browser
   - Navigate to: [https://vercel.com](https://vercel.com)

2. **Sign Up**
   - Click **"Sign Up"** button (top right)
   - Choose **"Continue with GitHub"** (recommended)
   - This connects your GitHub repositories

3. **Authorize Vercel**
   - Click **"Authorize Vercel"** when prompted
   - Grant access to your repositories
   - You can limit access to specific repositories if preferred

### Step 2: Deploy Your Frontend
1. **Import Project**
   - After login, click **"Add New..."** → **"Project"**
   - You'll see your GitHub repositories
   - Find your **"GRM Website"** repository
   - Click **"Import"** next to it

2. **Configure Project**
   - **Framework Preset**: Should auto-detect "Next.js"
   - **Root Directory**: Click **"Edit"** and select **"frontend"**
   - **Build Command**: Should auto-fill `npm run build`
   - **Output Directory**: Should auto-fill `.next`
   - **Install Command**: Should auto-fill `npm install`

3. **Environment Variables**
   - Click **"Environment Variables"** section
   - Add these variables:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.railway.app/api
   NEXT_PUBLIC_APP_URL = https://your-project.vercel.app
   NEXT_PUBLIC_SITE_URL = https://your-project.vercel.app
   ```
   - **Note**: You'll update these URLs after getting your actual deployment URLs

4. **Deploy**
   - Click **"Deploy"** button
   - Wait 2-5 minutes for deployment
   - You'll get a URL like: `https://grm-website-frontend.vercel.app`

### Step 3: Configure Custom Domain

#### Option A: If You Already Own a Domain

1. **Add Domain in Vercel**
   - Go to your project dashboard
   - Click **"Settings"** tab
   - Click **"Domains"** in left sidebar
   - Click **"Add"** button
   - Enter your domain: `grmrobotics.com`
   - Click **"Add"**

2. **Configure DNS Records**
   - Vercel will show you DNS records to add
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add these DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.19.61
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Verify Domain**
   - Back in Vercel, click **"Refresh"**
   - Wait for DNS propagation (5-60 minutes)
   - Domain status will change to "Valid"

#### Option B: Get a FREE Domain

1. **Free Domain from Freenom**
   - Go to: [https://freenom.com](https://freenom.com)
   - Search for available domains (.tk, .ml, .ga, .cf)
   - Example: `grmrobotics.tk`
   - Register for FREE (up to 12 months)

2. **Configure Freenom DNS**
   - In Freenom dashboard, go to **"Manage Domain"**
   - Click **"Manage Freenom DNS"**
   - Add these records:
   ```
   Type: A
   Name: (leave empty)
   Target: 76.76.19.61
   
   Type: CNAME
   Name: www
   Target: cname.vercel-dns.com
   ```

3. **Add to Vercel**
   - Follow the same steps as Option A
   - Add your free domain to Vercel
   - Wait for verification

#### Option C: Use Vercel Subdomain (Easiest)
   - No setup required
   - Use the provided URL: `https://your-project.vercel.app`
   - Professional and works immediately
   - Can add custom domain later

### Step 4: SSL Certificate Setup
1. **Automatic SSL**
   - Vercel automatically provides SSL certificates
   - No configuration needed
   - Your site will be accessible via HTTPS

2. **Force HTTPS**
   - In project settings, go to **"Functions"**
   - Enable **"Force HTTPS"** (usually enabled by default)

### Step 5: Configure Environment Variables
1. **Update Environment Variables**
   - Go to **"Settings"** → **"Environment Variables"**
   - Update with your actual URLs:
   ```
   NEXT_PUBLIC_API_URL = https://grm-robotics-backend.railway.app/api
   NEXT_PUBLIC_APP_URL = https://grmrobotics.com
   NEXT_PUBLIC_SITE_URL = https://grmrobotics.com
   ```

2. **Redeploy**
   - Go to **"Deployments"** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**
   - Or push a new commit to trigger auto-deployment

### Step 6: Configure Advanced Settings

#### Performance Optimization:
1. **Edge Functions**
   - Go to **"Settings"** → **"Functions"**
   - **Region**: Choose closest to your users
   - **Runtime**: Keep "Node.js 18.x"

2. **Caching**
   - Go to **"Settings"** → **"General"**
   - **Build & Development Settings**:
     - **Framework Preset**: Next.js
     - **Node.js Version**: 18.x

#### Security Settings:
1. **Headers**
   - Vercel automatically adds security headers
   - Custom headers can be configured in `next.config.js`

2. **Environment Variables Security**
   - Production variables are encrypted
   - Never expose sensitive data in `NEXT_PUBLIC_` variables

### Step 7: Set Up Automatic Deployments
1. **Git Integration**
   - Already configured when you imported from GitHub
   - Every push to `main` branch triggers deployment
   - Preview deployments for other branches

2. **Deployment Settings**
   - Go to **"Settings"** → **"Git"**
   - **Production Branch**: `main`
   - **Preview Deployments**: Enable for all branches
   - **Automatic Deployments**: Enable

### Step 8: Configure Analytics (Optional)
1. **Vercel Analytics**
   - Go to **"Analytics"** tab
   - Click **"Enable Analytics"**
   - Free tier includes basic analytics

2. **Web Vitals**
   - Automatically tracks Core Web Vitals
   - Monitor performance metrics
   - Identify optimization opportunities

## 🧪 Testing Your Deployment

### Test Your Live Site:
1. **Basic Functionality**
   - Visit your domain: `https://grmrobotics.com`
   - Check homepage loads correctly
   - Test navigation between pages
   - Verify mobile responsiveness

2. **API Connection**
   - Test user registration/login
   - Check product pages load
   - Verify shopping cart works
   - Test checkout process

3. **Performance**
   - Use Google PageSpeed Insights
   - Check loading times
   - Verify SSL certificate

## 📝 Important URLs to Save

After deployment, save these URLs:

```
Production URL: https://grmrobotics.com
Vercel Dashboard: https://vercel.com/dashboard
Project Settings: https://vercel.com/your-username/project-name/settings
Analytics: https://vercel.com/your-username/project-name/analytics
```

## 🔧 Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check **"Functions"** tab for build logs
   - Verify all dependencies in `package.json`
   - Ensure environment variables are set

2. **Domain Not Working**
   - Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
   - Verify DNS records are correct
   - Wait up to 48 hours for full propagation

3. **API Connection Issues**
   - Verify `NEXT_PUBLIC_API_URL` is correct
   - Check CORS settings in backend
   - Test API endpoint directly

4. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side
   - Redeploy after changing environment variables
   - Check variable names for typos

### Getting Help:
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Discord**: [vercel.com/discord](https://vercel.com/discord)
- **Support**: [vercel.com/support](https://vercel.com/support)

## 📊 Free Tier Limits

**What's Included FREE:**
- ✅ Unlimited bandwidth
- ✅ 100GB-hrs serverless execution
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Global CDN
- ✅ Automatic deployments
- ✅ Preview deployments
- ✅ Basic analytics

**Upgrade When You Need:**
- More serverless execution time
- Advanced analytics
- Team collaboration features
- Priority support

## 🎉 Success Checklist

Your Vercel deployment is ready when:
- [ ] Project deployed successfully
- [ ] Custom domain configured (if using)
- [ ] SSL certificate active (HTTPS working)
- [ ] Environment variables set
- [ ] Site loads without errors
- [ ] API connections working
- [ ] Mobile responsive
- [ ] Performance optimized

## 🔄 Next Steps

After Vercel setup:
1. **Test your live website thoroughly**
2. **Update backend CORS settings** with your domain
3. **Configure analytics and monitoring**
4. **Set up custom error pages** (optional)
5. **Optimize performance** based on analytics

Your GRM Robotics frontend is now live and accessible worldwide! 🚀

## 📱 Mobile Testing

Test these on mobile devices:
- [ ] Homepage responsive design
- [ ] Product browsing experience
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] User registration/login
- [ ] Touch interactions work properly

## 🔍 SEO Configuration

Vercel automatically handles:
- ✅ Meta tags from your Next.js app
- ✅ Sitemap.xml serving
- ✅ Robots.txt serving
- ✅ Open Graph images
- ✅ Fast loading times for SEO

Your website is now optimized for search engines and ready for customers! 🎊